import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Client-side Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server-side Supabase client for API routes
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Client component helper
export const createSupabaseClient = () => {
  return createClientComponentClient();
};

// Server component helper
export const createSupabaseServerClient = () => {
  return createServerComponentClient({ cookies });
};

// Database helper functions
export class DatabaseService {
  private supabase;

  constructor(useAdmin = false) {
    this.supabase = useAdmin ? supabaseAdmin : supabase;
  }

  // User Profile Operations
  async getUserProfile(userId: string) {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw error;
    }

    return data;
  }

  async createUserProfile(profileData: any) {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .insert(profileData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateUserProfile(userId: string, updates: any) {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Test Results Operations
  async saveTestResult(testData: {
    user_id: string;
    test_type: string;
    result_data: any;
    raw_scores?: any;
    is_completed?: boolean;
  }) {
    const { data, error } = await this.supabase
      .from('test_results')
      .insert({
        ...testData,
        completion_date: new Date().toISOString(),
        is_completed: testData.is_completed ?? true
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserTestResults(userId: string, testType?: string) {
    let query = this.supabase
      .from('test_results')
      .select('*')
      .eq('user_id', userId)
      .order('completion_date', { ascending: false });

    if (testType) {
      query = query.eq('test_type', testType);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async getLatestTestResult(userId: string, testType: string) {
    const { data, error } = await this.supabase
      .from('test_results')
      .select('*')
      .eq('user_id', userId)
      .eq('test_type', testType)
      .eq('is_completed', true)
      .order('completion_date', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data;
  }

  // AI Analysis Operations
  async saveAIAnalysis(analysisData: {
    user_id: string;
    analysis_type: string;
    input_data: any;
    ai_response: any;
    confidence_score?: number;
    version?: number;
  }) {
    const { data, error } = await this.supabase
      .from('ai_analysis')
      .insert({
        ...analysisData,
        confidence_score: analysisData.confidence_score ?? 0.8,
        version: analysisData.version ?? 1,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getLatestAIAnalysis(userId: string, analysisType: string) {
    const { data, error } = await this.supabase
      .from('ai_analysis')
      .select('*')
      .eq('user_id', userId)
      .eq('analysis_type', analysisType)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data;
  }

  // Chat Operations
  async saveChatMessage(messageData: {
    user_id: string;
    message: string;
    sender: 'user' | 'ai';
  }) {
    const { data, error } = await this.supabase
      .from('chat_messages')
      .insert({
        ...messageData,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getChatHistory(userId: string, limit = 50) {
    const { data, error } = await this.supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  // Career Operations
  async getCareers(filters?: {
    category?: string;
    search?: string;
    limit?: number;
  }) {
    let query = this.supabase
      .from('careers')
      .select('*')
      .order('title', { ascending: true });

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.search) {
      query = query.ilike('title', `%${filters.search}%`);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async getCareerBySlug(slug: string) {
    const { data, error } = await this.supabase
      .from('careers')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  }

  // Utility Methods
  async getUserCompleteData(userId: string) {
    // Get user profile
    const profile = await this.getUserProfile(userId);
    
    // Get all test results
    const testResults = await this.getUserTestResults(userId);
    
    // Get latest AI analysis
    const latestAnalysis = await this.getLatestAIAnalysis(userId, 'comprehensive');
    
    return {
      profile,
      testResults,
      latestAnalysis
    };
  }

  async checkUserExists(userId: string) {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();

    return !error && data;
  }
}

// Export singleton instance
export const db = new DatabaseService();
export const dbAdmin = new DatabaseService(true);