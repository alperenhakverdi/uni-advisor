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
    let aiResponse;
    
    switch (analysisType) {
      case 'career_match':
        const mbtiResult = userData.testResults.find(t => t.test_type === 'mbti')?.result_data?.result;
        const hollandCode = userData.testResults.find(t => t.test_type === 'holland')?.result_data?.code;
        const skills = userData.testResults.find(t => t.test_type === 'skills')?.result_data;
        
        aiResponse = await geminiService.generateCareerMatches(
          mbtiResult, 
          hollandCode, 
          skills, 
          userData.profile
        );
        break;
        
      case 'comprehensive':
      default:
        aiResponse = await geminiService.generateComprehensiveAnalysis(assessmentData);
        break;
    }

    // Save analysis
    const savedAnalysis = await db.saveAIAnalysis({
      user_id: user.id,
      analysis_type: analysisType,
      input_data: assessmentData,
      ai_response: aiResponse,
      confidence_score: aiResponse.confidence_score || 0.8,
      version: 1,
    });

    return successResponse({
      analysis: savedAnalysis,
      result: aiResponse,
    }, 'Analysis generated successfully');
    
  } catch (error) {
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
      age_range: profile.age_range || '',
      education_level: profile.education_level || '',
      current_status: profile.current_status || '',
      city: profile.city || '',
      family_income: profile.family_income || '',
      tyt_score: profile.tyt_score,
      ayt_score: profile.ayt_score,
      gpa: profile.gpa,
      career_goal: profile.career_goal,
      target_timeline: profile.target_timeline || '',
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