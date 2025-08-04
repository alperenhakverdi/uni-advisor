import { NextRequest } from 'next/server';
import { getAuthenticatedUser, successResponse, errorResponse, validateRequest, handleApiError, testSubmissionSchema, assessmentSubmissionSchema } from '@/lib/api';
import { db } from '@/lib/supabase';
import { geminiService } from '@/lib/ai';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const { searchParams } = new URL(request.url);
    const testType = searchParams.get('type');

    // Get user's test results
    const testResults = await db.getUserTestResults(user.id, testType || undefined);
    
    return successResponse(testResults);
    
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

    // Check request type - either single test or comprehensive assessment
    const body = await request.json();
    
    if (body.assessmentData) {
      // Handle comprehensive assessment submission
      return handleComprehensiveAssessment(user.id, body.assessmentData);
    } else {
      // Handle single test submission
      const validation = await validateRequest(request, testSubmissionSchema);
      
      if (!validation.success) {
        return errorResponse(validation.error);
      }

      const testData = {
        user_id: user.id,
        test_type: validation.data.test_type,
        result_data: validation.data.result_data,
        raw_scores: validation.data.raw_scores,
        is_completed: validation.data.is_completed,
      };

      const savedTest = await db.saveTestResult(testData);
      
      return successResponse(savedTest, 'Test result saved successfully');
    }
    
  } catch (error) {
    return handleApiError(error);
  }
}

async function handleComprehensiveAssessment(userId: string, assessmentData: any) {
  try {
    // Validate assessment data
    const validation = assessmentSubmissionSchema.safeParse(assessmentData);
    
    if (!validation.success) {
      return errorResponse('Invalid assessment data');
    }

    const validatedData = validation.data;

    // 1. Save/Update user profile
    await db.updateUserProfile(userId, validatedData.profileData);

    // 2. Save individual test results
    const testResults = [];

    // MBTI Test Result
    const mbtiTest = await db.saveTestResult({
      user_id: userId,
      test_type: 'mbti',
      result_data: { result: validatedData.mbtiResult },
      is_completed: true,
    });
    testResults.push(mbtiTest);

    // Holland Test Result
    const hollandTest = await db.saveTestResult({
      user_id: userId,
      test_type: 'holland',
      result_data: { code: validatedData.hollandCode },
      is_completed: true,
    });
    testResults.push(hollandTest);

    // Work Values Test
    const valuesTest = await db.saveTestResult({
      user_id: userId,
      test_type: 'values',
      result_data: validatedData.workValues,
      is_completed: true,
    });
    testResults.push(valuesTest);

    // Skills Test
    const skillsTest = await db.saveTestResult({
      user_id: userId,
      test_type: 'skills',
      result_data: validatedData.skills,
      is_completed: true,
    });
    testResults.push(skillsTest);

    // Work Style Test
    const workStyleTest = await db.saveTestResult({
      user_id: userId,
      test_type: 'work_style',
      result_data: {
        life_preferences: validatedData.lifePreferences,
        financial_approach: validatedData.financialApproach,
        work_style: validatedData.workStyle,
        work_environment: validatedData.workEnvironment,
        personal_development: validatedData.personalDevelopment,
      },
      is_completed: true,
    });
    testResults.push(workStyleTest);

    // 3. Generate AI analysis
    console.log('Generating AI analysis for user:', userId);
    const aiAnalysis = await geminiService.generateComprehensiveAnalysis(validatedData);

    // 4. Save AI analysis
    const savedAnalysis = await db.saveAIAnalysis({
      user_id: userId,
      analysis_type: 'comprehensive',
      input_data: validatedData,
      ai_response: aiAnalysis,
      confidence_score: aiAnalysis.confidence_score,
      version: 1,
    });

    return successResponse({
      testResults,
      analysis: savedAnalysis,
      aiResponse: aiAnalysis,
    }, 'Assessment completed successfully');

  } catch (error) {
    console.error('Assessment processing error:', error);
    return handleApiError(error);
  }
}