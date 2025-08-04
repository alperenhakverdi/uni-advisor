import { NextRequest } from 'next/server';
import { getAuthenticatedUser, successResponse, errorResponse, validateRequest, handleApiError, profileUpdateSchema } from '@/lib/api';
import { db, dbAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    // Get user profile
    const profile = await db.getUserProfile(user.id);
    
    if (!profile) {
      // Create empty profile if doesn't exist
      const newProfile = {
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      const createdProfile = await db.createUserProfile(newProfile);
      return successResponse(createdProfile);
    }

    return successResponse(profile);
    
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    // Validate request body
    const validation = await validateRequest(request, profileUpdateSchema);
    
    if (!validation.success) {
      return errorResponse(validation.error);
    }

    // Update profile
    const updatedProfile = await db.updateUserProfile(user.id, validation.data);
    
    return successResponse(updatedProfile, 'Profile updated successfully');
    
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

    // Check if profile already exists
    const existingProfile = await db.getUserProfile(user.id);
    
    if (existingProfile) {
      return errorResponse('Profile already exists', 409);
    }

    // Validate request body
    const validation = await validateRequest(request, profileUpdateSchema);
    
    if (!validation.success) {
      return errorResponse(validation.error);
    }

    // Create new profile
    const profileData = {
      user_id: user.id,
      ...validation.data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const newProfile = await db.createUserProfile(profileData);
    
    return successResponse(newProfile, 'Profile created successfully');
    
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE() {
  try {
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    // Delete profile and all related data
    const { error } = await dbAdmin.supabase
      .from('user_profiles')
      .delete()
      .eq('user_id', user.id);

    if (error) {
      throw error;
    }

    return successResponse(null, 'Profile deleted successfully');
    
  } catch (error) {
    return handleApiError(error);
  }
}