'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// Mock AI analiz sonucu - gerçekte backend'den gelecek
const analizSonucu = {
  genelBasari: {
    tamamlanmaOrani: 100,
    baslik: "Tüm analizlerin başarıyla tamamlandı!",
    mesaj: "Artık sana özel kariyer yolunu çizebiliriz. AI destekli önerilerle hedefinize ulaşın."
  },
  uygunMeslekler: [
    {
      isim: "UX/UI Tasarımcı",
      uygunluk: 96,
      kategori: "🎨 Yaratıcı",
      aciklama: "Yaratıcılığınız ve analitik düşünce beceriniz bu alanı size mükemmel kılıyor.",
      neden: "INTJ kişiliğiniz + güçlü görsel zeka + problem çözme yaklaşımınız UX tasarımının DNA'sı.",
      maas: "8K-18K ₺",
      trend: "Son 3 yılda talep %45 arttı",
      icon: "🎨",
      ana: true
    },
    {
      isim: "Veri Analisti", 
      uygunluk: 91,
      kategori: "📊 Analitik",
      aciklama: "Sayılarla hikaye anlatma yeteneğiniz bu alanda parlayacak.",
      maas: "7K-16K ₺",
      trend: "AI boom ile yüksek talep",
      icon: "📊"
    },
    {
      isim: "İçerik Stratejisti",
      uygunluk: 89, 
      kategori: "💬 İletişim",
      aciklama: "Stratejik düşünce + yaratıcılık kombinasyonu için ideal alan.",
      maas: "6K-14K ₺",
      trend: "Dijital dönüşümle büyüyor",
      icon: "✍️"
    },
    {
      isim: "Grafik Tasarımcı",
      uygunluk: 87,
      kategori: "🎨 Yaratıcı", 
      aciklama: "Görsel iletişim beceriniz ve estetik anlayışınız öne çıkıyor.",
      maas: "5K-12K ₺",
      trend: "Freelance fırsatları bol",
      icon: "🖼️"
    },
    {
      isim: "Ürün Yöneticisi",
      uygunluk: 85,
      kategori: "⚡ Liderlik",
      aciklama: "Stratejik vizyon ve detay odaklı yaklaşımınız uygun.",
      maas: "10K-22K ₺", 
      trend: "Tech sektörde yüksek talep",
      icon: "🚀"
    }
  ],
  kisilikOzeti: {
    mbti: "INTJ",
    holland: "ISA", 
    ozetMetni: "Stratejik düşünen, yaratıcı ve bağımsız çalışmayı seven bir yapınız var. Karmaşık problemleri çözmeyi seviyorsunuz ve detaylara odaklanabiliyorsunuz.",
    gucluYonler: [
      "Stratejik düşünce",
      "Yaratıcı problem çözme", 
      "Analitik yaklaşım",
      "Bağımsız çalışma"
    ],
    gelisimAlanlari: [
      { 
        alan: "Takım çalışması", 
        neden: "UX projeleri çoğunlukla ekip işidir", 
        nasil: "Küçük gruplarla proje çalışmaları yapın",
        oncelik: "Yüksek" 
      },
      { 
        alan: "Sunum becerileri", 
        neden: "Tasarımlarınızı müşterilere anlatmanız gerekecek", 
        nasil: "Haftalık kısa sunumlar hazırlayıp pratik yapın",
        oncelik: "Orta" 
      },
      { 
        alan: "Kullanıcı empati", 
        neden: "İyi bir UX tasarımcı kullanıcıyı anlamalı", 
        nasil: "Farklı yaş gruplarıyla röportajlar yapın",
        oncelik: "Yüksek" 
      }
    ]
  },
  beceriProfili: [
    { isim: "Yaratıcılık", puan: 95, durum: "Mükemmel", aciklama: "Özgün çözümler üretebiliyorsunuz" },
    { isim: "Analitik Düşünce", puan: 88, durum: "Çok İyi", aciklama: "Veriyi yorumlama beceriniz güçlü" },
    { isim: "Problem Çözme", puan: 90, durum: "Mükemmel", aciklama: "Karmaşık sorunları parçalayabiliyorsunuz" },
    { isim: "İletişim", puan: 70, durum: "Geliştirebilir", aciklama: "Teknik konuları sade anlatmayı geliştirin" },
    { isim: "Takım Çalışması", puan: 65, durum: "Geliştirebilir", aciklama: "Grup dinamiklerinde daha aktif olun" }
  ],
  aiOnerileri: [
    { 
      tip: "Öğrenme",
      baslik: "Figma ve Adobe XD'yi öğrenin",
      aciklama: "UX tasarım için en popüler araçlar",
      neden: "Yaratıcı yönünüz güçlü, araçla bunu görselleştirebilirsiniz",
      sure: "2-3 ay",
      oncelik: "Yüksek",
      tamamlandi: false
    },
    {
      tip: "Pratik", 
      baslik: "5 kullanıcı ile röportaj yapın",
      aciklama: "Gerçek kullanıcı deneyimi araştırması",
      neden: "Analitik yaklaşımınız kullanıcı ihtiyaçlarını keşfetmede değerli olacak",
      sure: "2 hafta",
      oncelik: "Yüksek", 
      tamamlandi: false
    },
    {
      tip: "Gelişim",
      baslik: "UX Turkey topluluğuna katılın",
      aciklama: "Networking ve güncel trendler için",
      neden: "Bağımsız çalışma tarzınızı dengelemek için sosyal ağ önemli",
      sure: "Hemen",
      oncelik: "Orta",
      tamamlandi: false
    }
  ]
};

export default function SonuclarSayfasi() {
  const [animationStep, setAnimationStep] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [secilenMeslek, setSecilenMeslek] = useState(analizSonucu.uygunMeslekler[0]);
  const [aiOnerilerState, setAiOnerilerState] = useState(analizSonucu.aiOnerileri);

  useEffect(() => {
    // Adım adım animasyon
    const timer = setInterval(() => {
      setAnimationStep(prev => (prev < 4 ? prev + 1 : prev));
    }, 300);

    return () => clearInterval(timer);
  }, []);

  // Dark mode
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedDarkMode = localStorage.getItem('resultsDarkMode') === 'true';
      setDarkMode(savedDarkMode);
      if (savedDarkMode) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('resultsDarkMode', newDarkMode.toString());
    }
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleAiOneriTamamlandi = (index: number) => {
    setAiOnerilerState(prev => prev.map((oneri, i) => 
      i === index ? { ...oneri, tamamlandi: !oneri.tamamlandi } : oneri
    ));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`transition-colors duration-300 border-b ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/dashboard"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Dashboard'a Dön
            </Link>
            <h1 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              🎯 Kariyer Analiz Sonuçlarınız
            </h1>
            <div className="flex items-center space-x-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                📄 PDF İndir
              </button>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                📤 Paylaş
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* 1. TEBRIK KARTI */}
        <div className={`transition-all duration-700 ${
          animationStep >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 mb-8 text-white text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-3">
              {analizSonucu.genelBasari.baslik}
            </h2>
            <p className="text-xl text-green-100 mb-6 max-w-2xl mx-auto">
              {analizSonucu.genelBasari.mesaj}
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="bg-white/20 rounded-lg p-3">
                <div className="text-2xl font-bold">{analizSonucu.kisilikOzeti.mbti}</div>
                <div className="text-sm text-green-100">Kişilik Tipi</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="text-2xl font-bold">{analizSonucu.kisilikOzeti.holland}</div>
                <div className="text-sm text-green-100">İlgi Profili</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="text-2xl font-bold">%{analizSonucu.genelBasari.tamamlanmaOrani}</div>
                <div className="text-sm text-green-100">Tamamlandı</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. EN UYGUN MESLEKLER - ÇOK SEÇENEKLİ */}
        <div className={`transition-all duration-700 delay-200 ${
          animationStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className={`rounded-2xl shadow-xl p-8 mb-8 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              🎯 Size En Uygun Meslekler
            </h3>
            
            {/* Meslek Listesi */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
              {analizSonucu.uygunMeslekler.map((meslek, index) => (
                <button
                  key={index}
                  onClick={() => setSecilenMeslek(meslek)}
                  className={`p-4 rounded-xl transition-all duration-300 text-left ${
                    secilenMeslek.isim === meslek.isim
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="text-2xl mb-2">{meslek.icon}</div>
                  <div className="font-semibold text-sm mb-1">{meslek.isim}</div>
                  <div className={`text-xs mb-2 ${
                    secilenMeslek.isim === meslek.isim ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {meslek.kategori}
                  </div>
                  <div className="text-lg font-bold">%{meslek.uygunluk}</div>
                  <div className={`text-xs ${
                    secilenMeslek.isim === meslek.isim ? 'text-blue-200' : 'text-gray-400'
                  }`}>
                    uygunluk
                  </div>
                </button>
              ))}
            </div>

            {/* Seçilen Meslek Detayı */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="text-4xl mr-4">{secilenMeslek.icon}</div>
                  <div>
                    <h4 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-blue-900'}`}>
                      {secilenMeslek.isim}
                    </h4>
                    <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                      {secilenMeslek.kategori}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    %{secilenMeslek.uygunluk}
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>uygunluk</div>
                </div>
              </div>

              <p className={`text-lg mb-4 ${darkMode ? 'text-blue-100' : 'text-blue-800'}`}>
                {secilenMeslek.aciklama}
              </p>
              
              {secilenMeslek.neden && (
                <div className={`p-4 rounded-lg mb-4 ${darkMode ? 'bg-blue-800/30' : 'bg-blue-100'}`}>
                  <h5 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-blue-900'}`}>
                    🧠 Neden Bu Meslek Size Uygun?
                  </h5>
                  <p className={`${darkMode ? 'text-blue-100' : 'text-blue-800'}`}>
                    {secilenMeslek.neden}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-blue-800/50' : 'bg-white'}`}>
                  <div className={`text-sm font-medium ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                    Maaş Aralığı
                  </div>
                  <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-blue-900'}`}>
                    {secilenMeslek.maas}
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                    Türkiye ortalaması - 2025
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-blue-800/50' : 'bg-white'}`}>
                  <div className={`text-sm font-medium ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                    Büyüme Trendi
                  </div>
                  <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-blue-900'}`}>
                    📈 Yüksek
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                    {secilenMeslek.trend}
                  </div>
                </div>
              </div>

              {/* TEK ANA CTA */}
              <div className="text-center">
                <Link
                  href="/skills-development"
                  className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mr-4"
                >
                  📈 Beceri Planını Oluştur
                </Link>
                <Link
                  href="/career-discovery"
                  className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                    darkMode 
                      ? 'text-blue-300 hover:text-blue-200 underline' 
                      : 'text-blue-600 hover:text-blue-800 underline'
                  }`}
                >
                  🔍 Meslek detaylarını incele
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 3. SOL KOLON - KİŞİLİK ÖZETİ */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Kişilik Özeti */}
            <div className={`transition-all duration-700 delay-300 ${
              animationStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  🧠 Kişilik Profiliniz
                </h3>
                <p className={`text-lg mb-6 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {analizSonucu.kisilikOzeti.ozetMetni}
                </p>
                
                {/* Güçlü Yönler */}
                <div className="mb-6">
                  <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    ⭐ Güçlü Yönleriniz
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {analizSonucu.kisilikOzeti.gucluYonler.map((guc, index) => (
                      <div key={index} className="flex items-center p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className={`text-sm font-medium ${darkMode ? 'text-green-200' : 'text-green-800'}`}>
                          {guc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Beceri Profili - Açıklamalı */}
                <div>
                  <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    📊 Beceri Değerlendirmeniz
                  </h4>
                  <div className="space-y-3">
                    {analizSonucu.beceriProfili.map((beceri, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {beceri.isim}
                          </span>
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            beceri.durum === 'Mükemmel' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            beceri.durum === 'Çok İyi' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                            'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                          }`}>
                            {beceri.durum}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1">
                          <div 
                            className={`h-2 rounded-full transition-all duration-1000 ${
                              beceri.durum === 'Mükemmel' ? 'bg-green-500' :
                              beceri.durum === 'Çok İyi' ? 'bg-blue-500' : 'bg-orange-500'
                            }`}
                            style={{ width: animationStep >= 3 ? `${beceri.puan}%` : '0%' }}
                          />
                        </div>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          💡 {beceri.aciklama}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Gelişim Alanları - Detaylı */}
            <div className={`transition-all duration-700 delay-400 ${
              animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  📈 Gelişim Alanları
                </h3>
                <div className="space-y-4">
                  {analizSonucu.kisilikOzeti.gelisimAlanlari.map((alan, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${
                      alan.oncelik === 'Yüksek' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {alan.alan}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          alan.oncelik === 'Yüksek' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {alan.oncelik} Öncelik
                        </span>
                      </div>
                      <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <strong>Neden:</strong> {alan.neden}
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <strong>Nasıl gelişir:</strong> {alan.nasil}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* 4. SAĞ KOLON - AI ÖNERİLERİ */}
          <div className={`transition-all duration-700 delay-500 ${
            animationStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            
            {/* AI Önerileri - ETKİLEŞİMLİ */}
            <div className={`rounded-xl shadow-lg p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                🤖 Sana Özel AI Önerileri
              </h3>
              <div className="space-y-4">
                {aiOnerilerState.map((oneri, index) => (
                  <div key={index} className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    oneri.tamamlandi 
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/30' 
                      : oneri.tip === 'Öğrenme' ? 'border-blue-200 bg-blue-50 dark:bg-blue-900/30' :
                        oneri.tip === 'Pratik' ? 'border-green-200 bg-green-50 dark:bg-green-900/30' :
                        'border-purple-200 bg-purple-50 dark:bg-purple-900/30'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleAiOneriTamamlandi(index)}
                          className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-colors ${
                            oneri.tamamlandi 
                              ? 'border-green-500 bg-green-500 text-white' 
                              : 'border-gray-300 hover:border-green-400'
                          }`}
                        >
                          {oneri.tamamlandi && '✓'}
                        </button>
                        <h4 className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {oneri.tip === 'Öğrenme' ? '📚' : oneri.tip === 'Pratik' ? '💻' : '🌟'} {oneri.baslik}
                        </h4>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        oneri.oncelik === 'Yüksek' 
                          ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' 
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {oneri.oncelik}
                      </span>
                    </div>
                    <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {oneri.aciklama}
                    </p>
                    <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <strong>Neden sana uygun:</strong> {oneri.neden}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        ⏱️ Süre: {oneri.sure}
                      </p>
                      {oneri.tamamlandi && (
                        <Link 
                          href="/chat"
                          className="text-xs text-green-600 hover:text-green-800 underline"
                        >
                          AI'ye sor: "Sonraki adım ne?"
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ana Eylem Çağrısı */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 text-white text-center mb-6">
              <h3 className="text-lg font-bold mb-2">🚀 Sonraki Adım</h3>
              <p className="text-purple-100 text-sm mb-4">
                {secilenMeslek.isim} olma yolculuğuna başlayın!
              </p>
              <Link 
                href="/skills-development"
                className="bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold inline-block mb-3"
              >
                📈 Beceri Planını Oluştur
              </Link>
              <div className="text-center">
                <Link 
                  href="/chat"
                  className="text-purple-200 hover:text-white text-sm underline"
                >
                  💬 AI Danışmanla detayları konuş
                </Link>
              </div>
            </div>

            {/* Hızlı Linkler - Sadeleştirilmiş */}
            <div className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                ⚡ Hızlı Erişim
              </h3>
              <div className="space-y-2">
                <Link
                  href="/career-discovery"
                  className={`block p-2 text-sm rounded-lg transition-colors ${
                    darkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  🔍 Tüm meslekleri karşılaştır
                </Link>
                <Link
                  href="/skills-development"
                  className={`block p-2 text-sm rounded-lg transition-colors ${
                    darkMode ? 'text-green-300 hover:text-green-200' : 'text-green-600 hover:text-green-800'
                  }`}
                >
                  📚 Öğrenme kaynaklarını keşfet
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* 5. MOTIVASYON VE DESTEK - KİŞİSELLEŞTİRİLMİŞ */}
        <div className={`mt-12 transition-all duration-700 delay-600 ${
          animationStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className={`rounded-lg p-6 text-center ${darkMode ? 'bg-blue-900' : 'bg-blue-50'}`}>
            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
              💡 INTJ Kişiliği İçin Özel Tavsiye
            </h4>
            <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>
              INTJ'lerin güçlü olduğu yönlerden biri, bireysel araştırmadır. 
              AI danışmanına "UX tasarımda nereden başlamalıyım?" diye detaylı sorular sorabilirsin.
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <Link 
                href="/chat"
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  darkMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                💬 AI ile Detaylı Konuş
              </Link>
              <button className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-white text-blue-700 hover:bg-blue-100 border border-blue-300'
              }`}>
                ⭐ Bu analiz nasıldı?
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}