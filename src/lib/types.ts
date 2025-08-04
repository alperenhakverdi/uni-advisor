// Database Types
export interface UserProfile {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  age_range: string | null;
  education_level: string | null;
  current_status: string | null;
  city: string | null;
  family_income: string | null;
  tyt_score: number | null;
  ayt_score: number | null;
  gpa: number | null;
  interests: string[] | null;
  career_goal: string | null;
  target_timeline: string | null;
  created_at: string;
  updated_at: string;
}

export interface TestResult {
  id: string;
  user_id: string;
  test_type: 'mbti' | 'holland' | 'values' | 'skills' | 'work_style';
  result_data: any;
  raw_scores: any;
  completion_date: string;
  is_completed: boolean;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  sender: 'user' | 'ai';
  created_at: string;
}

export interface Career {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  requirements: string[];
  skills: string[];
  personality_types: string[];
  holland_codes: string[];
  salary_range_min: number;
  salary_range_max: number;
  education_level: string;
  growth_rate: number;
  difficulty_level: number;
  remote_friendly: boolean;
  created_at: string;
  updated_at: string;
}

export interface AIAnalysis {
  id: string;
  user_id: string;
  analysis_type: 'career_match' | 'skill_gap' | 'personality' | 'comprehensive';
  input_data: any;
  ai_response: any;
  confidence_score: number;
  created_at: string;
  version: number;
}

// Request/Response Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ProfileUpdateRequest {
  first_name?: string;
  last_name?: string;
  age_range?: string;
  education_level?: string;
  current_status?: string;
  city?: string;
  family_income?: string;
  tyt_score?: number;
  ayt_score?: number;
  gpa?: number;
  interests?: string[];
  career_goal?: string;
  target_timeline?: string;
}

export interface TestSubmissionRequest {
  test_type: string;
  answers: any;
  completion_time?: number;
}

export interface ChatRequest {
  message: string;
  context?: any;
}

export interface ChatResponse {
  message: string;
  suggestions?: string[];
  context?: any;
}

// Gemini AI Types
export interface CareerMatchResult {
  career: string;
  match_percentage: number;
  reasoning: string;
  strengths: string[];
  growth_areas: string[];
  salary_range: string;
  job_outlook: string;
}

export interface PersonalityAnalysis {
  mbti_type: string;
  holland_code: string;
  key_traits: string[];
  strengths: string[];
  development_areas: string[];
  work_style: string;
  ideal_environment: string;
  leadership_style: string;
}

export interface SkillGapAnalysis {
  target_career: string;
  current_skills: { [key: string]: number };
  required_skills: { [key: string]: number };
  skill_gaps: {
    skill: string;
    current_level: number;
    required_level: number;
    priority: 'high' | 'medium' | 'low';
    learning_resources: string[];
  }[];
  estimated_learning_time: string;
}

export interface ComprehensiveAnalysis {
  personality_analysis: PersonalityAnalysis;
  career_matches: CareerMatchResult[];
  skill_analysis: SkillGapAnalysis;
  recommendations: {
    immediate_actions: string[];
    short_term_goals: string[];
    long_term_vision: string;
  };
  confidence_score: number;
}

// Form Types
export interface AssessmentFormData {
  // Profile Data
  profileData: {
    age_range: string;
    education_level: string;
    current_status: string;
    city: string;
    family_income: string;
    tyt_score?: number;
    ayt_score?: number;
    gpa?: number;
    career_goal?: string;
    target_timeline: string;
  };
  
  // Test Results
  mbtiResult: string;
  hollandCode: string;
  
  // Work Values (1-5 scale)
  workValues: {
    salary: number;
    work_life_balance: number;
    creativity: number;
    helping_others: number;
    prestige: number;
    job_security: number;
    autonomy: number;
    personal_growth: number;
  };
  
  // Life Preferences
  lifePreferences: {
    city_change: string;
    income_uncertainty: string;
    long_hours: string;
    physical_work: string;
    travel: string;
  };
  
  // Financial Approach
  financialApproach: {
    income_priority: string;
    career_speed: string;
    work_preference: string;
    retirement_plan: string;
  };
  
  // Work Style
  workStyle: {
    stress_performance: string;
    leadership_desire: string;
    feedback_approach: string;
    multitasking: string;
  };
  
  // Work Environment
  workEnvironment: {
    environment: string;
    work_format: string;
    pace: string;
    travel_desire: string;
  };
  
  // Skills (1-10 scale)
  skills: {
    mathematics: number;
    verbal_communication: number;
    technical_skills: number;
    leadership: number;
    creativity: number;
    problem_solving: number;
    social_skills: number;
    organization: number;
  };
  
  // Personal Development
  personalDevelopment: {
    learning_style: string;
    change_preference: string;
    mentorship_preference: string;
  };
}