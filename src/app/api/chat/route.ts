import { NextRequest } from 'next/server';
import { getAuthenticatedUser, successResponse, errorResponse, validateRequest, handleApiError, chatMessageSchema, rateLimit } from '@/lib/api';
import { db } from '@/lib/supabase';
import { geminiService } from '@/lib/ai';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    // Get chat history
    const chatHistory = await db.getChatHistory(user.id, limit);
    
    return successResponse(chatHistory);
    
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

    // Rate limiting - 20 messages per minute
    if (!rateLimit(`chat_${user.id}`, 20, 60000)) {
      return errorResponse('Too many requests. Please wait a moment.', 429);
    }

    // Validate message
    const validation = await validateRequest(request, chatMessageSchema);
    
    if (!validation.success) {
      return errorResponse(validation.error);
    }

    const { message, context } = validation.data;

    // Save user message
    await db.saveChatMessage({
      user_id: user.id,
      message: message,
      sender: 'user',
    });

    // Get user context for better responses
    const userContext = await getUserContext(user.id);
    
    // Get recent chat history
    const recentHistory = await db.getChatHistory(user.id, 10);

    // Generate AI response
    const aiResponse = await geminiService.generateChatResponse(
      message,
      userContext,
      recentHistory
    );

    // Save AI response
    await db.saveChatMessage({
      user_id: user.id,
      message: aiResponse.message,
      sender: 'ai',
    });

    return successResponse({
      message: aiResponse.message,
      suggestions: aiResponse.suggestions,
      context: aiResponse.context,
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    // Delete all chat history for user
    const { error } = await db.supabase
      .from('chat_messages')
      .delete()
      .eq('user_id', user.id);

    if (error) {
      throw error;
    }

    return successResponse(null, 'Chat history deleted successfully');
    
  } catch (error) {
    return handleApiError(error);
  }
}

async function getUserContext(userId: string) {
  try {
    // Get user's profile and latest analysis for context
    const profile = await db.getUserProfile(userId);
    const latestAnalysis = await db.getLatestAIAnalysis(userId, 'comprehensive');
    const testResults = await db.getUserTestResults(userId);

    const context = {
      profile: profile ? {
        age_range: profile.age_range,
        education_level: profile.education_level,
        current_status: profile.current_status,
        city: profile.city,
        career_goal: profile.career_goal,
      } : null,
      
      personality: testResults.length > 0 ? {
        mbti: testResults.find(t => t.test_type === 'mbti')?.result_data?.result,
        holland: testResults.find(t => t.test_type === 'holland')?.result_data?.code,
      } : null,
      
      analysis: latestAnalysis ? {
        top_career: latestAnalysis.ai_response?.career_matches?.[0]?.career,
        confidence: latestAnalysis.confidence_score,
      } : null,
    };

    return context;
  } catch (error) {
    console.error('Error getting user context:', error);
    return null;
  }
}