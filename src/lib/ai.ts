import { GoogleGenerativeAI } from '@google/generative-ai';
import type { 
  AssessmentFormData, 
  ComprehensiveAnalysis,
  CareerMatchResult,
  PersonalityAnalysis,
  SkillGapAnalysis,
  ChatResponse 
} from './types';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// AI Prompts
const PROMPTS = {
  COMPREHENSIVE_ANALYSIS: `
Sen bir kariyer danışmanı AI'sın. Kullanıcının verdiği test sonuçları ve kişisel bilgileri analiz ederek kapsamlı bir kariyer analizi yapacaksın.

Analiz edilecek veriler:
- MBTI sonucu
- Holland kodu (RIASEC)
- Yaş aralığı, eğitim seviyesi, şehir
- İş değerleri (1-5 puan)
- Yaşam tercihleri
- Finansal yaklaşım  
- Çalışma tarzı
- Çalışma ortamı tercihleri
- Beceri seviyeleri (1-10 puan)
- Kişisel gelişim yaklaşımı

ÇIKTI FORMATI (JSON olarak döndür):
{
  "personality_analysis": {
    "mbti_type": "INTJ",
    "holland_code": "ISA", 
    "key_traits": ["Stratejik düşünce", "Bağımsızlık", "Yaratıcılık"],
    "strengths": ["Problem çözme", "Analitik düşünce"],
    "development_areas": ["Takım çalışması", "Sosyal beceriler"],
    "work_style": "Bağımsız, detay odaklı, proye bazlı",
    "ideal_environment": "Esnek, yaratıcı, teknoloji odaklı",
    "leadership_style": "Vizyoner, stratejik, örnek olma"
  },
  "career_matches": [
    {
      "career": "UX/UI Tasarımcı",
      "match_percentage": 94,
      "reasoning": "Yaratıcılık ve teknik becerilerinin mükemmel uyumu",
      "strengths": ["Analitik yaklaşım", "Estetik anlayış"],
      "growth_areas": ["Kullanıcı empati", "Sunum becerileri"],
      "salary_range": "8K-18K TL",
      "job_outlook": "Çok yüksek talep, %35 büyüme"
    }
  ],
  "skill_analysis": {
    "target_career": "UX/UI Tasarımcı",
    "current_skills": {"Yaratıcılık": 9, "Teknik": 7},
    "required_skills": {"Figma": 8, "User Research": 7},
    "skill_gaps": [
      {
        "skill": "Kullanıcı Araştırması",
        "current_level": 3,
        "required_level": 8,
        "priority": "high",
        "learning_resources": ["UX Research kursu", "Design Thinking workshop"]
      }
    ],
    "estimated_learning_time": "3-6 ay yoğun çalışmayla"
  },
  "recommendations": {
    "immediate_actions": ["Figma öğrenmeye başla", "Portfolio oluştur"],
    "short_term_goals": ["3 ay içinde temel UX becerileri", "İlk projeyi tamamla"],
    "long_term_vision": "2 yıl içinde Senior UX Designer pozisyonuna ulaş"
  },
  "confidence_score": 85
}
`,

  CHAT_RESPONSE: `
Sen CareerPath AI kariyer danışmanısın. Kullanıcının sorularını Türkçe olarak yanıtla.

Uzmanlık alanların:
- Kariyer rehberliği
- Üniversite seçimi  
- Meslek analizi
- Beceri geliştirme
- Kişilik testleri
- İş dünyası trendleri

Yanıt tarzın:
- Samimi ve destekleyici
- Pratik ve uygulanabilir
- Türkiye'deki duruma uygun
- Kısa ve net (2-3 paragraf)

Eğer kullanıcının profil bilgileri varsa onları da dikkate al.

ÇIKTI FORMATI (JSON):
{
  "message": "Yanıt metni buraya",
  "suggestions": ["Öneri 1", "Öneri 2", "Öneri 3"],
  "context": "additional_info_if_needed"
}
`
};

export class GeminiService {
  private model = model;
  
  async generateComprehensiveAnalysis(assessmentData: AssessmentFormData): Promise<ComprehensiveAnalysis> {
    try {
      const prompt = `${PROMPTS.COMPREHENSIVE_ANALYSIS}

KULLANICI VERİLERİ:
${JSON.stringify(assessmentData, null, 2)}

Lütfen bu verileri analiz ederek yukarıdaki JSON formatında kapsamlı bir kariyer analizi döndür. Türkiye iş piyasasını dikkate al ve gerçekçi öneriler ver.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // JSON'ı parse et
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('AI response does not contain valid JSON');
      }
      
      const analysisData = JSON.parse(jsonMatch[0]);
      return analysisData as ComprehensiveAnalysis;
      
    } catch (error) {
      console.error('Gemini analysis error:', error);
      
      // Fallback response
      return this.getFallbackAnalysis(assessmentData);
    }
  }

  async generateChatResponse(
    message: string, 
    userContext?: any,
    chatHistory?: any[]
  ): Promise<ChatResponse> {
    try {
      let contextPrompt = PROMPTS.CHAT_RESPONSE;
      
      if (userContext) {
        contextPrompt += `\n\nKULLANICI PROFİLİ:\n${JSON.stringify(userContext, null, 2)}`;
      }
      
      if (chatHistory && chatHistory.length > 0) {
        const recentHistory = chatHistory.slice(-6); // Son 6 mesaj
        contextPrompt += `\n\nSON SOHBET:\n${recentHistory.map(msg => `${msg.sender}: ${msg.message}`).join('\n')}`;
      }
      
      const fullPrompt = `${contextPrompt}\n\nKULLANICI SORUSU: ${message}`;
      
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();
      
      // JSON'ı parse et
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const chatResponse = JSON.parse(jsonMatch[0]);
        return chatResponse as ChatResponse;
      }
      
      // Eğer JSON parse edilemezse, düz metin döndür
      return {
        message: text.trim(),
        suggestions: [
          "Daha detaylı bilgi verebilir misin?",
          "Bu konuda örnekler gösterebilir misin?",
          "Başka ne sorular sormak istersin?"
        ]
      };
      
    } catch (error) {
      console.error('Gemini chat error:', error);
      
      return {
        message: "Özür dilerim, şu anda bir teknik sorun yaşıyorum. Sorunuzu biraz daha açık bir şekilde sorabilir misiniz?",
        suggestions: [
          "Kariyer planımı nasıl yapabilirim?",
          "Hangi meslek bana uygun?",
          "Becerilerimi nasıl geliştirebilirim?"
        ]
      };
    }
  }

  async generateCareerMatches(
    mbtiType: string,
    hollandCode: string, 
    skills: any,
    preferences: any
  ): Promise<CareerMatchResult[]> {
    try {
      const prompt = `
Sen bir kariyer eşleştirme uzmanısın. Aşağıdaki bilgilere göre en uygun 5 mesleği öner:

MBTI: ${mbtiType}
Holland Kodu: ${hollandCode}
Beceriler: ${JSON.stringify(skills)}
Tercihler: ${JSON.stringify(preferences)}

Her meslek için şu bilgileri JSON formatında döndür:
[
  {
    "career": "Meslek adı",
    "match_percentage": 95,
    "reasoning": "Neden uygun açıklaması",
    "strengths": ["Güçlü yön 1", "Güçlü yön 2"],
    "growth_areas": ["Gelişim alanı 1", "Gelişim alanı 2"],
    "salary_range": "8K-15K TL",
    "job_outlook": "İş piyasası durumu"
  }
]

Türkiye iş piyasasını dikkate al.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]) as CareerMatchResult[];
      }
      
      return this.getFallbackCareerMatches();
      
    } catch (error) {
      console.error('Career matching error:', error);
      return this.getFallbackCareerMatches();
    }
  }

  // Fallback methods
  private getFallbackAnalysis(assessmentData: AssessmentFormData): ComprehensiveAnalysis {
    return {
      personality_analysis: {
        mbti_type: assessmentData.mbtiResult || "ISFJ",
        holland_code: assessmentData.hollandCode || "SIA",
        key_traits: ["Yardımseverlik", "Detay odaklılık", "Güvenilirlik"],
        strengths: ["İletişim", "Organizasyon", "Empati"],
        development_areas: ["Teknik beceriler", "Liderlik", "Risk alma"],
        work_style: "Destekleyici, düzenli, takım odaklı",
        ideal_environment: "Yapılandırılmış, sosyal, anlamlı",
        leadership_style: "Destekleyici, işbirlikçi, sabırlı"
      },
      career_matches: [
        {
          career: "İnsan Kaynakları Uzmanı",
          match_percentage: 88,
          reasoning: "İletişim becerileri ve insanlara yardım etme isteği",
          strengths: ["Empati", "İletişim", "Organizasyon"],
          growth_areas: ["İK sistemleri", "Veri analizi"],
          salary_range: "7K-15K TL",
          job_outlook: "Stabil, orta büyüme"
        },
        {
          career: "Öğretmen",
          match_percentage: 85,
          reasoning: "Sabır ve öğretme yeteneği",
          strengths: ["Sabır", "Açıklama", "Motivasyon"],
          growth_areas: ["Teknoloji kullanımı", "Sınıf yönetimi"],
          salary_range: "5K-10K TL",
          job_outlook: "İstikrarlı, devlet güvencesi"
        }
      ],
      skill_analysis: {
        target_career: "İnsan Kaynakları Uzmanı",
        current_skills: { "İletişim": 8, "Organizasyon": 7 },
        required_skills: { "İK Sistemleri": 6, "İşe Alım": 7 },
        skill_gaps: [
          {
            skill: "İK Sistemleri",
            current_level: 3,
            required_level: 7,
            priority: "high",
            learning_resources: ["İK sertifika programları", "SAP SuccessFactors kursu"]
          }
        ],
        estimated_learning_time: "6-9 ay"
      },
      recommendations: {
        immediate_actions: ["İK sertifika programına başla", "LinkedIn profilini güncelle"],
        short_term_goals: ["6 ay İK tecrübesi", "Temel İK sistemlerini öğren"],
        long_term_vision: "3 yıl içinde İK uzmanı olarak kariyer ilerlet"
      },
      confidence_score: 78
    };
  }

  private getFallbackCareerMatches(): CareerMatchResult[] {
    return [
      {
        career: "Dijital Pazarlama Uzmanı",
        match_percentage: 89,
        reasoning: "Yaratıcılık ve analitik düşünce becerilerinin uyumu",
        strengths: ["Sosyal medya", "İçerik üretimi", "Analiz"],
        growth_areas: ["Veri analizi", "SEO", "PPC Yönetimi"],
        salary_range: "5K-15K TL",
        job_outlook: "Yüksek talep, dijital dönüşüm"
      },
      {
        career: "Veri Analisti",
        match_percentage: 85,
        reasoning: "Analitik düşünce ve problem çözme becerileri",
        strengths: ["İstatistik", "Excel", "Raporlama"],
        growth_areas: ["Python", "Machine Learning", "Büyük veri"],
        salary_range: "7K-18K TL",
        job_outlook: "Çok yüksek talep, AI boom"
      },
      {
        career: "UX/UI Tasarımcı",
        match_percentage: 82,
        reasoning: "Yaratıcılık ve kullanıcı odaklı düşünce",
        strengths: ["Tasarım", "Empati", "Problem çözme"],
        growth_areas: ["Figma", "User Research", "Prototyping"],
        salary_range: "6K-16K TL",
        job_outlook: "Yüksek talep, dijital ürünler"
      }
    ];
  }
}

// Export singleton instance
export const geminiService = new GeminiService();