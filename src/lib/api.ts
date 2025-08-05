import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';
import type { APIResponse } from './types';

// Auth helper
export async function getAuthenticatedUser() {
  const supabase = createServerComponentClient({ cookies });
  
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

// API Response helpers
export function successResponse<T>(data: T, message?: string): NextResponse {
  return NextResponse.json({
    success: true,
    data,
    message,
  } as APIResponse<T>);
}

export function errorResponse(error: string, status: number = 400): NextResponse {
  return NextResponse.json({
    success: false,
    error,
  } as APIResponse<null>, { status });
}

// Request validation - ✅ DÜZELTME: Zod error handling
export async function validateRequest<T>(
  request: NextRequest,
  schema: z.ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // ✅ DÜZELTME: issues kullan, errors değil
      const errorMessage = error.issues.map((e: z.ZodIssue) => `${e.path.join('.')}: ${e.message}`).join(', ');
      return { success: false, error: `Validation error: ${errorMessage}` };
    }
    return { success: false, error: 'Invalid JSON format' };
  }
}

// Auth middleware for API routes
export async function withAuth(handler: (request: NextRequest, user: any) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    return handler(request, user);
  };
}

// CORS helper
export function addCorsHeaders(response: NextResponse): NextResponse {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

// Validation Schemas
export const profileUpdateSchema = z.object({
  first_name: z.string().min(1).max(50).optional(),
  last_name: z.string().min(1).max(50).optional(),
  age_range: z.string().optional(),
  education_level: z.string().optional(),
  current_status: z.string().optional(),
  city: z.string().optional(),
  family_income: z.string().optional(),
  tyt_score: z.number().min(0).max(500).optional(),
  ayt_score: z.number().min(0).max(500).optional(),
  gpa: z.number().min(0).max(4).optional(),
  interests: z.array(z.string()).optional(),
  career_goal: z.string().max(500).optional(),
  target_timeline: z.string().optional(),
});

export const testSubmissionSchema = z.object({
  test_type: z.enum(['mbti', 'holland', 'values', 'skills', 'work_style', 'comprehensive']),
  result_data: z.any(),
  raw_scores: z.any().optional(),
  is_completed: z.boolean().default(true),
});

export const chatMessageSchema = z.object({
  message: z.string().min(1).max(1000),
  context: z.any().optional(),
});

export const assessmentSubmissionSchema = z.object({
  // Profile data
  profileData: z.object({
    age_range: z.string(),
    education_level: z.string(),
    current_status: z.string(),
    city: z.string(),
    family_income: z.string(),
    tyt_score: z.number().optional(),
    ayt_score: z.number().optional(),
    gpa: z.number().optional(),
    career_goal: z.string().optional(),
    target_timeline: z.string(),
  }),
  
  // Test results
  mbtiResult: z.string(),
  hollandCode: z.string(),
  
  // Work values
  workValues: z.object({
    salary: z.number().min(1).max(5),
    work_life_balance: z.number().min(1).max(5),
    creativity: z.number().min(1).max(5),
    helping_others: z.number().min(1).max(5),
    prestige: z.number().min(1).max(5),
    job_security: z.number().min(1).max(5),
    autonomy: z.number().min(1).max(5),
    personal_growth: z.number().min(1).max(5),
  }),
  
  // Life preferences
  lifePreferences: z.object({
    city_change: z.string(),
    income_uncertainty: z.string(),
    long_hours: z.string(),
    physical_work: z.string(),
    travel: z.string(),
  }),
  
  // Financial approach
  financialApproach: z.object({
    income_priority: z.string(),
    career_speed: z.string(),
    work_preference: z.string(),
    retirement_plan: z.string(),
  }),
  
  // Work style
  workStyle: z.object({
    stress_performance: z.string(),
    leadership_desire: z.string(),
    feedback_approach: z.string(),
    multitasking: z.string(),
  }),
  
  // Work environment
  workEnvironment: z.object({
    environment: z.string(),
    work_format: z.string(),
    pace: z.string(),
    travel_desire: z.string(),
  }),
  
  // Skills
  skills: z.object({
    mathematics: z.number().min(1).max(10),
    verbal_communication: z.number().min(1).max(10),
    technical_skills: z.number().min(1).max(10),
    leadership: z.number().min(1).max(10),
    creativity: z.number().min(1).max(10),
    problem_solving: z.number().min(1).max(10),
    social_skills: z.number().min(1).max(10),
    organization: z.number().min(1).max(10),
  }),
  
  // Personal development
  personalDevelopment: z.object({
    learning_style: z.string(),
    change_preference: z.string(),
    mentorship_preference: z.string(),
  }),
});

// Rate limiting helper (simple in-memory implementation)
const rateLimits = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000 // 1 minute
): boolean {
  const now = Date.now();
  const current = rateLimits.get(identifier);

  if (!current || now > current.resetTime) {
    rateLimits.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count++;
  return true;
}

// Error handling
export function handleApiError(error: any): NextResponse {
  console.error('API Error:', error);

  if (error.code === 'PGRST116') {
    return errorResponse('Resource not found', 404);
  }

  if (error.code === '23505') {
    return errorResponse('Resource already exists', 409);
  }

  if (error.message?.includes('JWT')) {
    return errorResponse('Invalid or expired token', 401);
  }

  return errorResponse('Internal server error', 500);
}

// Helper to check if user profile exists
export async function ensureUserProfile(userId: string) {
  const { db } = await import('./supabase');
  
  const existingProfile = await db.getUserProfile(userId);
  
  if (!existingProfile) {
    // Create basic profile
    const basicProfile = {
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    return await db.createUserProfile(basicProfile);
  }
  
  return existingProfile;
}