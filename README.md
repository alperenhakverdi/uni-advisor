# 🚀 CareerPath AI

<div align="center">

**AI-Powered Career Guidance Platform**

*Kişiselleştirilmiş kariyer rehberliği ve meslek keşfi platformu*

[![Next.js](https://img.shields.io/badge/Next.js-15.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-green?style=flat-square&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google-Gemini_AI-orange?style=flat-square&logo=google)](https://ai.google/)

[🌟 Demo](http://localhost:3000) • [📖 Dokümantasyon](#-özellikler) • [🚀 Kurulum](#-kurulum)

</div>

---

## 📋 İçindekiler

- [Proje Hakkında](#-proje-hakkında)
- [Özellikler](#-özellikler)
- [Teknoloji Stack](#-teknoloji-stack)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [API Referansı](#-api-referansı)
- [Roadmap](#-roadmap)

---

## 🎯 Proje Hakkında

**CareerPath AI**, kullanıcıların kariyer yolculuğunda ihtiyaç duydukları tüm desteği sunan modern bir web platformudur. Yapay zeka teknolojisi kullanarak kişiselleştirilmiş meslek önerileri sunar ve kullanıcıların mesleki gelişimlerine rehberlik eder.

### 🌟 Temel Misyon

> *Her bireyin potansiyelini keşfetmesi ve doğru kariyer yolunu bulması için AI destekli, bilimsel ve kişiselleştirilmiş rehberlik sağlamak.*

---

## ✨ Özellikler

### 🧠 Kişilik Analizi & Testler
- **MBTI Kişilik Testi** - 16 kişilik tipi analizi
- **Holland İlgi Envanteri** - Meslek ilgi alanları keşfi  
- **Beceri Değerlendirmesi** - Güçlü ve gelişim alanları analizi
- **Değerler Testi** - İş hayatında önem verilen faktörler

### 🤖 AI Destekli Rehberlik
- **Akıllı Meslek Önerileri** - Kişilik ve yeteneklere göre özelleştirilmiş
- **24/7 Kariyer Chatbot** - Anında soru-cevap desteği
- **Trend Analizi** - Gelecek meslek trendleri ve fırsatları
- **Karar Destek Sistemi** - Kritik kariyer kararlarında rehberlik

### 📚 Kapsamlı Meslek Rehberi  
- **500+ Meslek Bilgisi** - Detaylı meslek açıklamaları
- **Maaş Analizleri** - Güncel maaş aralıkları ve beklentiler
- **Eğitim Yol Haritaları** - Gerekli eğitim ve sertifikalar
- **Sektör Trendleri** - İş piyasası analizi ve büyüme oranları

### 🎯 Kişisel Gelişim Planı
- **Beceri Gap Analizi** - Eksik alanların tespiti
- **Öğrenme Rotası** - Adım adım gelişim planı
- **Kaynak Önerileri** - Kurslar, kitaplar ve eğitim materyalleri
- **İlerleme Takibi** - Hedeflere ulaşma durumu izleme

### 🏫 Eğitim & Üniversite Rehberliği
- **Puana Göre Üniversite Önerileri** - TYT/AYT puanlarına özel
- **Bölüm Karşılaştırması** - Detaylı bölüm analizleri
- **Şehir Rehberi** - Yaşam maliyeti ve avantajlar
- **Başarı Hikayeler** - İlham verici mezun hikayeleri

---

## 🛠️ Teknoloji Stack

### Frontend
```
Next.js 15.4        # React Framework
TypeScript 5.0      # Type Safety
Tailwind CSS 4      # Styling
React 19            # UI Library
```

### Backend  
```
Next.js API Routes  # Backend API
Supabase           # Database & Auth
Google Gemini AI   # AI Integration
Zod                # Schema Validation
```

### Development
```
ESLint             # Code Linting
Turbopack          # Fast Bundler
PostCSS            # CSS Processing
```

---

## 🚀 Kurulum

### Ön Koşullar
- Node.js 18+ 
- npm veya yarn
- Git

### 1️⃣ Repository'yi Klonlayın
```bash
git clone https://github.com/alperenhakverdi/uni-advisor.git
cd uni-advisor
```

### 2️⃣ Bağımlılıkları Yükleyin
```bash
npm install
```

### 3️⃣ Environment Variables Ayarlayın
`.env.local` dosyası oluşturun:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google Gemini AI
GOOGLE_GEMINI_API_KEY=your_gemini_api_key

# NextJS
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
```

### 4️⃣ Development Server'ı Başlatın
```bash
npm run dev
```

🎉 **Tebrikler!** Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışıyor.

---

## 📖 Kullanım

### 🏃‍♂️ Hızlı Başlangıç
1. Ana sayfada **"Kayıt Ol"** ile hesap oluşturun
2. **Dashboard**'a geçerek profilinizi tamamlayın  
3. **"Kişilik Testine Başla"** ile testleri yapın
4. **AI Analizi** sonuçlarını görüntüleyin
5. **Meslek Keşfi** ile detayları inceleyin

### 🎯 Kullanım Senaryoları

#### Senaryo 1: Lise Öğrencisi
```
Ana Sayfa → Kayıt → Profil → Testler → AI Analizi → Üniversite Önerileri
```

#### Senaryo 2: Kariyer Değişikliği
```
Ana Sayfa → Giriş → Beceri Analizi → Meslek Keşfi → Gelişim Planı
```

#### Senaryo 3: Mesleki Gelişim
```
Dashboard → Mevcut Durum → Beceri Geliştirme → Öğrenme Rotası → Takip
```

---

## 🔧 API Referansı

### Authentication Endpoints
```typescript
POST   /api/auth          # User Registration
PUT    /api/auth          # User Login  
DELETE /api/auth          # User Logout
GET    /api/auth/user     # Get User Info
```

### Assessment Endpoints
```typescript
GET    /api/assessment    # Get Test Results
POST   /api/assessment    # Save Test Results
```

### Analysis Endpoints  
```typescript
GET    /api/analysis      # Get AI Analysis
POST   /api/analysis      # Generate Analysis
```

### Chat Endpoints
```typescript
GET    /api/chat          # Get Chat History
POST   /api/chat          # Send Message
```

### Profile Endpoints
```typescript
GET    /api/profile       # Get User Profile
PUT    /api/profile       # Update Profile
```

---

## 📊 Roadmap

### 🎯 v1.0 - MVP (Mevcut)
- [x] Kullanıcı kayıt/giriş
- [x] Kişilik testleri (MBTI, Holland)
- [x] AI destekli meslek önerileri
- [x] Temel dashboard
- [x] Chat danışmanı

### 🚀 v1.1 - Enhanced Features
- [ ] Gelişmiş profil yönetimi
- [ ] Sosyal özellikler (meslek grupları)
- [ ] Detaylı raporlama sistemi
- [ ] Mobile app (React Native)

### 🌟 v2.0 - AI Revolution
- [ ] Ses tabanlı AI asistan
- [ ] Video röportaj analizi
- [ ] Şirket eşleştirme sistemi
- [ ] Mentörlük platformu

---

## 📄 License

Bu proje [MIT License](LICENSE) altında lisanslanmıştır.

---

## 🤝 İletişim & Destek

<div align="center">

**Sorularınız mı var? Yardıma mı ihtiyacınız var?**

[![Email](https://img.shields.io/badge/Email-alperenhkverdi364%40gmail.com-red?style=for-the-badge&logo=gmail)](mailto:alperenhkverdi364@gmail.com)
[![GitHub Issues](https://img.shields.io/github/issues/alperenhakverdi/uni-advisor?style=for-the-badge&logo=github)](https://github.com/alperenhakverdi/uni-advisor/issues)
[![Documentation](https://img.shields.io/badge/Docs-GitBook-blue?style=for-the-badge&logo=gitbook)](https://docs.careerpath.ai)

</div>

---

<div align="center">

**⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın! ⭐**

*Made with ❤️ by Alperen Hakverdi*

</div>