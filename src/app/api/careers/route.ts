import { NextRequest } from 'next/server';
import { successResponse, errorResponse, handleApiError } from '@/lib/api';
import { db } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');

    const filters = {
      category: category || undefined,
      search: search || undefined,
      limit,
    };

    const careers = await db.getCareers(filters);
    
    return successResponse(careers);
    
  } catch (error) {
    return handleApiError(error);
  }
}

// Mock career data for initial setup
export async function POST() {
  try {
    const mockCareers = [
      {
        title: 'UX/UI Tasarımcı',
        slug: 'ux-ui-tasarimci',
        category: 'teknoloji',
        description: 'Kullanıcı deneyimi ve arayüz tasarımı yapan yaratıcı profesyonel',
        requirements: ['Figma', 'Photoshop', 'User Research', 'Wireframing'],
        skills: ['Yaratıcılık', 'Analitik Düşünce', 'İletişim', 'Problem Çözme'],
        personality_types: ['INFP', 'ISFP', 'ENFP', 'INTJ'],
        holland_codes: ['A', 'I', 'S'],
        salary_range_min: 8000,
        salary_range_max: 18000,
        education_level: 'Lisans',
        growth_rate: 25.0,
        difficulty_level: 3,
        remote_friendly: true,
      },
      {
        title: 'Yazılım Geliştirici',
        slug: 'yazilim-gelistirici',
        category: 'teknoloji',
        description: 'Web siteleri, mobil uygulamalar ve yazılım sistemleri geliştiren profesyonel',
        requirements: ['JavaScript', 'Python', 'React', 'Git'],
        skills: ['Analitik Düşünce', 'Problem Çözme', 'Matematik', 'Mantık'],
        personality_types: ['INTJ', 'INTP', 'ISTJ', 'ISTP'],
        holland_codes: ['I', 'R', 'C'],
        salary_range_min: 10000,
        salary_range_max: 25000,
        education_level: 'Lisans',
        growth_rate: 35.0,
        difficulty_level: 4,
        remote_friendly: true,
      },
      {
        title: 'Dijital Pazarlama Uzmanı',
        slug: 'dijital-pazarlama-uzmani',
        category: 'pazarlama',
        description: 'Online platformlarda marka tanıtımı ve satış stratejileri yöneten uzman',
        requirements: ['Google Analytics', 'SEO', 'Social Media', 'Content Writing'],
        skills: ['Yaratıcılık', 'İletişim', 'Analitik Düşünce', 'Sosyal Beceriler'],
        personality_types: ['ENFP', 'ESFP', 'ENTP', 'ESFJ'],
        holland_codes: ['E', 'A', 'S'],
        salary_range_min: 6000,
        salary_range_max: 15000,
        education_level: 'Lisans',
        growth_rate: 20.0,
        difficulty_level: 2,
        remote_friendly: true,
      },
      {
        title: 'İnsan Kaynakları Uzmanı',
        slug: 'insan-kaynaklari-uzmani',
        category: 'yonetim',
        description: 'Personel işleri, işe alım ve çalışan gelişimi konularında uzman',
        requirements: ['İletişim', 'Mülakat Teknikleri', 'İş Hukuku', 'Office Programları'],
        skills: ['İletişim', 'Empati', 'Organizasyon', 'Problem Çözme'],
        personality_types: ['ESFJ', 'ENFJ', 'ISFJ', 'INFJ'],
        holland_codes: ['S', 'E', 'C'],
        salary_range_min: 7000,
        salary_range_max: 15000,
        education_level: 'Lisans',
        growth_rate: 8.0,
        difficulty_level: 2,
        remote_friendly: false,
      },
      {
        title: 'Veri Analisti',
        slug: 'veri-analisti',
        category: 'teknoloji',
        description: 'Büyük veri kümelerini analiz ederek iş kararlarına yön veren uzman',
        requirements: ['Python', 'SQL', 'Excel', 'İstatistik'],
        skills: ['Matematik', 'Analitik Düşünce', 'Problem Çözme', 'Detay Odaklılık'],
        personality_types: ['INTJ', 'ISTJ', 'INTP', 'ISTP'],
        holland_codes: ['I', 'C', 'R'],
        salary_range_min: 9000,
        salary_range_max: 20000,
        education_level: 'Lisans',
        growth_rate: 40.0,
        difficulty_level: 4,
        remote_friendly: true,
      },
      {
        title: 'Grafik Tasarımcı',
        slug: 'grafik-tasarimci',
        category: 'sanat-tasarim',
        description: 'Görsel kimlik, logo, poster ve dijital tasarım yapan yaratıcı profesyonel',
        requirements: ['Photoshop', 'Illustrator', 'InDesign', 'Yaratıcılık'],
        skills: ['Yaratıcılık', 'Görsel Tasarım', 'Renk Teorisi', 'Tipografi'],
        personality_types: ['ISFP', 'INFP', 'ESFP', 'ENFP'],
        holland_codes: ['A', 'I', 'E'],
        salary_range_min: 5000,
        salary_range_max: 12000,
        education_level: 'Önlisans',
        growth_rate: 12.0,
        difficulty_level: 2,
        remote_friendly: true,
      },
      {
        title: 'Öğretmen',
        slug: 'ogretmen',
        category: 'egitim',
        description: 'Öğrencilere bilgi ve beceri kazandıran, eğitim sürecini yöneten profesyonel',
        requirements: ['Pedagoji', 'Alan Bilgisi', 'İletişim', 'Sabır'],
        skills: ['İletişim', 'Sabır', 'Empati', 'Organizasyon'],
        personality_types: ['ENFJ', 'ISFJ', 'ESFJ', 'INFJ'],
        holland_codes: ['S', 'A', 'E'],
        salary_range_min: 5000,
        salary_range_max: 10000,
        education_level: 'Lisans',
        growth_rate: 4.0,
        difficulty_level: 3,
        remote_friendly: false,
      },
      {
        title: 'Doktor',
        slug: 'doktor',
        category: 'saglik',
        description: 'Hastalık teşhisi, tedavi ve sağlık hizmetleri sunan tıp uzmanı',
        requirements: ['Tıp Eğitimi', 'Empati', 'Analitik Düşünce', 'Stres Yönetimi'],
        skills: ['Empati', 'Problem Çözme', 'Detay Odaklılık', 'İletişim'],
        personality_types: ['ISFJ', 'INFJ', 'ISTJ', 'INTJ'],
        holland_codes: ['I', 'S', 'R'],
        salary_range_min: 15000,
        salary_range_max: 50000,
        education_level: 'Tıp Fakültesi',
        growth_rate: 8.0,
        difficulty_level: 5,
        remote_friendly: false,
      },
      {
        title: 'Proje Yöneticisi',
        slug: 'proje-yoneticisi',
        category: 'yonetim',
        description: 'Projeleri planlayan, yöneten ve takip eden liderlik pozisyonu',
        requirements: ['Liderlik', 'Planlama', 'İletişim', 'Problem Çözme'],
        skills: ['Liderlik', 'Organizasyon', 'İletişim', 'Stres Yönetimi'],
        personality_types: ['ENTJ', 'ESTJ', 'ENFJ', 'ENTP'],
        holland_codes: ['E', 'S', 'C'],
        salary_range_min: 10000,
        salary_range_max: 22000,
        education_level: 'Lisans',
        growth_rate: 15.0,
        difficulty_level: 4,
        remote_friendly: true,
      },
      {
        title: 'İçerik Editörü',
        slug: 'icerik-editoru',
        category: 'medya',
        description: 'Yazılı ve görsel içerik üreten, düzenleyen ve yayınlayan profesyonel',
        requirements: ['Yazma', 'Editörlük', 'SEO', 'İçerik Planlama'],
        skills: ['Yazma', 'Yaratıcılık', 'Detay Odaklılık', 'Araştırma'],
        personality_types: ['INFP', 'ISFP', 'ENFP', 'INTP'],
        holland_codes: ['A', 'I', 'E'],
        salary_range_min: 5000,
        salary_range_max: 12000,
        education_level: 'Lisans',
        growth_rate: 18.0,
        difficulty_level: 2,
        remote_friendly: true,
      }
    ];

    // This would typically be done via admin interface or migration
    // For now, return the mock data structure
    return successResponse(mockCareers, 'Career data structure ready');
    
  } catch (error) {
    return handleApiError(error);
  }
}