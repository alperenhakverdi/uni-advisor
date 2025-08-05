import { NextRequest } from 'next/server';
import { getAuthenticatedUser, successResponse, errorResponse, handleApiError } from '@/lib/api';
import { db } from '@/lib/supabase';
import { geminiService } from '@/lib/ai';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const { searchParams } = new URL(request.url);
    const analysisType = searchParams.get('type') || 'comprehensive';

    // Get latest AI analysis
    const analysis = await db.getLatestAIAnalysis(user.id, analysisType);
    
    if (!analysis) {
      return errorResponse('No analysis found. Please complete your assessment first.', 404);
    }

    return successResponse(analysis);
    
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const body = await request.json();
    const { analysisType = 'comprehensive', forceRegenerate = false } = body;

    // Check if recent analysis exists (unless force regenerate)
    if (!forceRegenerate) {
      const existingAnalysis = await db.getLatestAIAnalysis(user.id, analysisType);
      
      if (existingAnalysis) {
        const analysisAge = Date.now() - new Date(existingAnalysis.created_at).getTime();
        const oneHour = 60 * 60 * 1000;
        
        // Return existing analysis if less than 1 hour old
        if (analysisAge < oneHour) {
          return successResponse(existingAnalysis, 'Using cached analysis');
        }
      }
    }

    // Get user's complete data
    const userData = await db.getUserCompleteData(user.id);
    
    if (!userData.profile) {
      return errorResponse('Please complete your profile first', 400);
    }

    if (!userData.testResults || userData.testResults.length === 0) {
      return errorResponse('Please complete your assessment first', 400);
    }

    // Prepare data for AI analysis
    const assessmentData = prepareAssessmentData(userData);

    // Generate new analysis
    let aiResponse: any;
    let confidenceScore = 0.8; // Default confidence score
    
    switch (analysisType) {
      case 'career_match':
        const mbtiResult = userData.testResults.find(t => t.test_type === 'mbti')?.result_data?.result;
        const hollandCode = userData.testResults.find(t => t.test_type === 'holland')?.result_data?.code;
        const skills = userData.testResults.find(t => t.test_type === 'skills')?.result_data;
        
        // CareerMatchResult[] döndürür
        aiResponse = await geminiService.generateCareerMatches(
          mbtiResult || 'ISFJ', 
          hollandCode || 'SIA', 
          skills || {}, 
          userData.profile
        );
        
        // CareerMatchResult[] için confidence score hesapla
        if (Array.isArray(aiResponse) && aiResponse.length > 0) {
          const avgMatchPercentage = aiResponse.reduce((sum, career) => sum + career.match_percentage, 0) / aiResponse.length;
          confidenceScore = avgMatchPercentage / 100;
        }
        break;
        
      case 'comprehensive':
      default:
        // ComprehensiveAnalysis döndürür (confidence_score içerir)
        aiResponse = await geminiService.generateComprehensiveAnalysis(assessmentData);
        
        // ✅ GÜVENLI ERİŞİM: confidence_score varsa kullan
        if (aiResponse && typeof aiResponse === 'object' && 'confidence_score' in aiResponse) {
          confidenceScore = aiResponse.confidence_score || 0.8;
        }
        break;
    }

    // Save analysis
    const savedAnalysis = await db.saveAIAnalysis({
      user_id: user.id,
      analysis_type: analysisType,
      input_data: assessmentData,
      ai_response: aiResponse,
      confidence_score: confidenceScore, // ✅ DÜZELTME: Güvenli confidence_score
      version: 1,
    });

    return successResponse({
      analysis: savedAnalysis,
      result: aiResponse,
    }, 'Analysis generated successfully');
    
  } catch (error) {
    console.error('Analysis API error:', error);
    return handleApiError(error);
  }
}

function prepareAssessmentData(userData: any) {
  const { profile, testResults } = userData;
  
  // Find specific test results
  const mbtiTest = testResults.find((t: any) => t.test_type === 'mbti');
  const hollandTest = testResults.find((t: any) => t.test_type === 'holland');
  const valuesTest = testResults.find((t: any) => t.test_type === 'values');
  const skillsTest = testResults.find((t: any) => t.test_type === 'skills');
  const workStyleTest = testResults.find((t: any) => t.test_type === 'work_style');

  return {
    profileData: {
      age_range: profile?.age_range || '',
      education_level: profile?.education_level || '',
      current_status: profile?.current_status || '',
      city: profile?.city || '',
      family_income: profile?.family_income || '',
      tyt_score: profile?.tyt_score || null,
      ayt_score: profile?.ayt_score || null,
      gpa: profile?.gpa || null,
      career_goal: profile?.career_goal || '',
      target_timeline: profile?.target_timeline || '',
    },
    mbtiResult: mbtiTest?.result_data?.result || 'ISFJ',
    hollandCode: hollandTest?.result_data?.code || 'SIA',
    workValues: valuesTest?.result_data || {
      salary: 3,
      work_life_balance: 4,
      creativity: 3,
      helping_others: 4,
      prestige: 3,
      job_security: 4,
      autonomy: 3,
      personal_growth: 4,
    },
    lifePreferences: workStyleTest?.result_data?.life_preferences || {
      city_change: 'Koşullara göre',
      income_uncertainty: 'Kısa süre için kabul ederim',
      long_hours: 'Gerekirse yaparım',
      physical_work: 'Fark etmez',
      travel: 'Bazen olabilir',
    },
    financialApproach: workStyleTest?.result_data?.financial_approach || {
      income_priority: 'Orta maaş + güvenlik',
      career_speed: 'Dengeli ilerleme',
      work_preference: 'İkisi de olabilir',
      retirement_plan: 'Normal yaşta (60\'larda)',
    },
    workStyle: workStyleTest?.result_data?.work_style || {
      stress_performance: 'Normal performansım',
      leadership_desire: 'Takım üyesi olmayı tercih ederim',
      feedback_approach: 'Zorlanırım ama kabul ederim',
      multitasking: 'Halledebilirim',
    },
    workEnvironment: workStyleTest?.result_data?.work_environment || {
      environment: 'Ofis ortamı',
      work_format: 'Hibrit çalışma',
      pace: 'Normal tempo',
      travel_desire: 'Bazen',
    },
    skills: skillsTest?.result_data || {
      mathematics: 5,
      verbal_communication: 6,
      technical_skills: 4,
      leadership: 5,
      creativity: 6,
      problem_solving: 7,
      social_skills: 6,
      organization: 7,
    },
    personalDevelopment: workStyleTest?.result_data?.personal_development || {
      learning_style: 'Karma yöntem',
      change_preference: 'Dengeli - hem yenilik hem rutin',
      mentorship_preference: 'Mentor veya rehber isterim',
    }
  };
}