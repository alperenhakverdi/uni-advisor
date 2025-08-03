'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// Mock user state - gerçekte API'den gelecek
interface KullaniciDurumu {
  profilTamamlandi: boolean;
  kisilikTestiAlindi: boolean;
  aiAnaliziVar: boolean;
  beceriPlaniVar: boolean;
  sonMeslekOnerisi?: string;
  tamamlanmaYuzdesi: number;
  eksikTestler: string[];
  gunlukHedef: string;
  gunlukHedefAciklama: string;
}

export default function KullaniciPaneli() {
  const [kullaniciDurumu, setKullaniciDurumu] = useState<KullaniciDurumu>({
    profilTamamlandi: true,
    kisilikTestiAlindi: true, 
    aiAnaliziVar: true,
    beceriPlaniVar: false,
    sonMeslekOnerisi: "UX/UI Tasarımcı",
    tamamlanmaYuzdesi: 75,
    eksikTestler: ["Beceri Değerlendirmesi"],
    gunlukHedef: "Kariyer haritanı çıkar, 3 eksik becerini geliştir!",
    gunlukHedefAciklama: "Hedef, en yüksek uyum sağladığınız meslek olan UX/UI Tasarımcıya göre belirlendi."
  });

  const [darkMode, setDarkMode] = useState(false);

  // Dark mode toggle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedDarkMode = localStorage.getItem('dashboardDarkMode') === 'true';
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
      localStorage.setItem('dashboardDarkMode', newDarkMode.toString());
    }
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // AI Meslek Önerileri Mock Data
  const aiMeslekOnerileri = [
    { isim: "UX/UI Tasarımcı", uygunluk: 94, trend: "📈", maas: "8K-15K", aciklama: "Yaratıcılık ve teknik becerilerinizin mükemmel uyumu" },
    { isim: "Ürün Yöneticisi", uygunluk: 89, trend: "🚀", maas: "12K-25K", aciklama: "Liderlik ve stratejik düşünce becerilerinize uygun" },
    { isim: "Veri Analisti", uygunluk: 87, trend: "💡", maas: "7K-18K", aciklama: "Analitik düşünce ve problem çözme yeteneklerinize uygun" }
  ];

  // Sonraki adım belirleme
  const sonrakiAdimBelirle = () => {
    if (!kullaniciDurumu.profilTamamlandi) {
      return {
        baslik: "Profilinizi Tamamlayın",
        aciklama: "Kişiselleştirilmiş öneriler için profilinizi doldurun",
        link: "/profile",
        renk: "blue",
        oncelik: "Yüksek",
        ikon: "👤"
      };
    }
    
    if (!kullaniciDurumu.kisilikTestiAlindi) {
      return {
        baslik: "Kişilik Testini Tamamlayın", 
        aciklama: "Size uygun meslekleri keşfetmek için analizi bitirin",
        link: "/assessment",
        renk: "purple",
        oncelik: "Yüksek",
        ikon: "🧠"
      };
    }

    if (!kullaniciDurumu.aiAnaliziVar) {
      return {
        baslik: "AI Analiziniz Bekliyor",
        aciklama: "Test sonuçlarınız işleniyor, analizi tamamlayalım",
        link: "/results",
        renk: "orange", 
        oncelik: "Beklemede",
        ikon: "🤖"
      };
    }

    if (!kullaniciDurumu.beceriPlaniVar) {
      return {
        baslik: "Beceri Gelişim Planınızı Oluşturun",
        aciklama: "Hedef mesleğiniz için eksik becerilerinizi belirleyin",
        link: "/skills-development",
        renk: "green",
        oncelik: "Orta",
        ikon: "📈"
      };
    }

    return {
      baslik: "Planınızı Uygulama Zamanı",
      aciklama: "Günlük hedeflerinizi gerçekleştirmeye başlayın",
      link: "/skills-development", 
      renk: "indigo",
      oncelik: "Düşük",
      ikon: "🎯"
    };
  };

  const sonrakiAdim = sonrakiAdimBelirle();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`transition-colors duration-300 border-b ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CareerPath AI
              </h1>
            </div>
            <div className="flex items-center space-x-4">
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
              
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Hoş geldiniz!</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Aktif</span>
                </div>
              </div>
              <button className="text-red-600 hover:text-red-800 text-sm">
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* İlerleme Durumu - Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mb-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold mb-2">🎯 Kariyer Yolculuğunuz</h2>
              <p className="text-blue-100 mb-4">
                Kariyer analizinizin <span className="font-bold">%{kullaniciDurumu.tamamlanmaYuzdesi}'i</span> tamamlandı. 
                {kullaniciDurumu.tamamlanmaYuzdesi < 100 ? " Hedefe çok yakınsınız!" : " Tebrikler, analiz tamamlandı!"}
              </p>
              
              {/* İlerleme Çubuğu */}
              <div className="bg-white/20 rounded-full h-3 w-80 mb-2">
                <div 
                  className="bg-white h-3 rounded-full transition-all duration-500"
                  style={{ width: `${kullaniciDurumu.tamamlanmaYuzdesi}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-blue-100 mb-2">
                <span>
                  {kullaniciDurumu.tamamlanmaYuzdesi < 100 
                    ? `${100 - kullaniciDurumu.tamamlanmaYuzdesi}% kaldı` 
                    : "Tamamlandı! 🎉"
                  }
                </span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                  💡 Meslek planı ve beceri planı oluşturulunca %100 olacak
                </span>
              </div>
            </div>
            
            {/* İlerleme İkonları - TIKLANABİLİR */}
            <div className="hidden md:flex space-x-4">
              <Link href="/profile" className={`text-center cursor-pointer transition-all hover:scale-110 ${kullaniciDurumu.profilTamamlandi ? 'text-white' : 'text-blue-300'}`}>
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold transition-all hover:shadow-lg ${kullaniciDurumu.profilTamamlandi ? 'bg-white text-blue-600' : 'bg-blue-500 hover:bg-blue-400'}`}>
                  {kullaniciDurumu.profilTamamlandi ? '✓' : '1'}
                </div>
                <p className="text-xs">Profil</p>
              </Link>
              <Link href="/assessment" className={`text-center cursor-pointer transition-all hover:scale-110 ${kullaniciDurumu.kisilikTestiAlindi ? 'text-white' : 'text-blue-300'}`}>
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold transition-all hover:shadow-lg ${kullaniciDurumu.kisilikTestiAlindi ? 'bg-white text-blue-600' : 'bg-blue-500 hover:bg-blue-400'}`}>
                  {kullaniciDurumu.kisilikTestiAlindi ? '✓' : '2'}
                </div>
                <p className="text-xs">Test</p>
              </Link>
              <Link href="/results" className={`text-center cursor-pointer transition-all hover:scale-110 ${kullaniciDurumu.aiAnaliziVar ? 'text-white' : 'text-blue-300'}`}>
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold transition-all hover:shadow-lg ${kullaniciDurumu.aiAnaliziVar ? 'bg-white text-blue-600' : 'bg-blue-500 hover:bg-blue-400'}`}>
                  {kullaniciDurumu.aiAnaliziVar ? '✓' : '3'}
                </div>
                <p className="text-xs">Analiz</p>
              </Link>
              <Link href="/skills-development" className={`text-center cursor-pointer transition-all hover:scale-110 ${kullaniciDurumu.beceriPlaniVar ? 'text-white' : 'text-blue-300'}`}>
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold transition-all hover:shadow-lg ${kullaniciDurumu.beceriPlaniVar ? 'bg-white text-blue-600' : 'bg-blue-500 hover:bg-blue-400'}`}>
                  {kullaniciDurumu.beceriPlaniVar ? '✓' : '4'}
                </div>
                <p className="text-xs">Plan</p>
              </Link>
            </div>
          </div>
        </div>

        {/* YENİ: Kısaca Yol Haritanız */}
        <div className={`rounded-xl shadow-lg p-6 mb-8 border-l-4 border-green-500 ${
          darkMode ? 'bg-gray-800' : 'bg-green-50'
        }`}>
          <div className="flex items-center mb-3">
            <div className="text-2xl mr-3">🗺️</div>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-green-900'}`}>
              Kısaca Yol Haritanız
            </h3>
          </div>
          <p className={`text-lg ${darkMode ? 'text-green-200' : 'text-green-800'}`}>
            Şu anda <span className="font-bold">UX/UI Tasarımcı</span> olma yolculuğundasınız. 
            <span className="font-bold"> 3 beceri eksik</span>. 
            AI destekli danışmanla planlamanızı oluşturun ve hedefinize ulaşın.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sol Kolon - Ana İçerik */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Önerilen Sonraki Adım */}
            <div className={`rounded-xl shadow-lg p-6 border-l-4 transition-all duration-300 hover:shadow-xl ${
              darkMode ? 'bg-gray-800 border-blue-500' : 'bg-white border-blue-500'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="text-4xl mr-4">{sonrakiAdim.ikon}</div>
                  <div>
                    <h3 className={`text-xl font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Önerilen Sonraki Adım
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      sonrakiAdim.oncelik === 'Yüksek' ? 'bg-red-100 text-red-800' :
                      sonrakiAdim.oncelik === 'Orta' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {sonrakiAdim.oncelik} Öncelik
                    </span>
                  </div>
                </div>
              </div>
              <h4 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {sonrakiAdim.baslik}
              </h4>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {sonrakiAdim.aciklama}
              </p>
              
              {/* Eksik Beceriler Listesi */}
              {!kullaniciDurumu.beceriPlaniVar && (
                <div className={`p-4 rounded-lg mb-4 ${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50'}`}>
                  <h5 className={`font-semibold mb-2 ${darkMode ? 'text-yellow-200' : 'text-yellow-900'}`}>
                    🎯 Eksik Becerileriniz:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {['Sunum Becerileri', 'Takım Çalışması', 'Kullanıcı Empati'].map((beceri, index) => (
                      <span key={index} className="px-2 py-1 bg-yellow-600 text-white text-xs rounded-full">
                        {beceri}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <Link 
                href={sonrakiAdim.link}
                className={`inline-flex items-center bg-${sonrakiAdim.renk}-600 text-white px-6 py-3 rounded-lg hover:bg-${sonrakiAdim.renk}-700 transition-colors font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
              >
                Şimdi Başla →
              </Link>
            </div>

            {/* AI Meslek Önerileri */}
            {kullaniciDurumu.aiAnaliziVar && (
              <div className={`rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="text-3xl mr-3">🤖</div>
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      En Uygun Meslekleriniz
                    </h3>
                  </div>
                  <Link 
                    href="/results"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors font-medium text-sm shadow-lg"
                  >
                    🔍 Tüm Sonuçları Gör
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {aiMeslekOnerileri.map((meslek, index) => (
                    <div key={index} className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                      darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-650' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{meslek.trend}</span>
                          <div>
                            <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {meslek.isim}
                            </h4>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              💰 Maaş: {meslek.maas}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">%{meslek.uygunluk}</div>
                          <div className="text-xs text-gray-500">uygunluk</div>
                        </div>
                      </div>
                      <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {meslek.aciklama}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${meslek.uygunluk}%` }}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href="/career-discovery"
                          className="flex-1 bg-blue-600 text-white text-center py-1 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          📋 Detayları Gör
                        </Link>
                        <Link
                          href="/skills-development"
                          className={`flex-1 text-center py-1 px-3 rounded text-sm transition-colors ${
                            darkMode 
                              ? 'bg-gray-600 text-white hover:bg-gray-500' 
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          📈 Plan Oluştur
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Beceri Planınız - Sadece eksikse göster */}
            {!kullaniciDurumu.beceriPlaniVar && (
              <div className={`rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">📈</div>
                  <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Beceri Planınız
                  </h3>
                </div>
                
                <div className="text-center py-6">
                  <div className="text-6xl mb-4">📝</div>
                  <h4 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Henüz Beceri Planınız Yok
                  </h4>
                  <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    UX/UI Tasarımcı hedef mesleğiniz için gerekli becerileri belirleyin ve kişisel planınızı oluşturun
                  </p>
                  
                  <Link
                    href="/skills-development"
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold inline-flex items-center"
                  >
                    <span className="mr-2">🚀</span>
                    Plan Oluştur
                  </Link>
                </div>
              </div>
            )}

          </div>
          
          {/* Sağ Kolon - Sidebar */}
          <div className="space-y-6">
            
            {/* AI Danışman */}
            <div className={`rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="text-center">
                <div className="text-4xl mb-3">🤖</div>
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  AI Danışmanınız
                </h3>
                <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Kariyer sorularınız için 24/7 kişiselleştirilmiş danışmanlık
                </p>
                
                <Link 
                  href="/chat"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold inline-block"
                >
                  💬 Hemen Konuş
                </Link>
              </div>
            </div>

            {/* Bugünün Hedefi */}
            <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">🎯 Bugünün Hedefi</h3>
              <p className="text-green-100 text-sm mb-3">
                {kullaniciDurumu.gunlukHedef}
              </p>
              
              {/* Hedef Açıklaması */}
              <div className="bg-white/10 rounded-lg p-3 mb-4">
                <p className="text-xs text-green-100">
                  💡 {kullaniciDurumu.gunlukHedefAciklama}
                </p>
              </div>
              
              <Link 
                href="/skills-development"
                className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-semibold inline-block"
              >
                Hadi Başlayalım! 🚀
              </Link>
            </div>

            {/* Hızlı Erişim - Sadece gerekli olanlar */}
            <div className={`rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                🛠️ Hızlı Erişim
              </h3>
              <div className="space-y-3">
                {!kullaniciDurumu.beceriPlaniVar && (
                  <Link href="/skills-development" className={`flex items-center p-3 rounded-lg transition-colors ${
                    darkMode ? 'bg-orange-900 hover:bg-orange-800' : 'bg-orange-50 hover:bg-orange-100'
                  }`}>
                    <div className="text-orange-600 text-xl mr-3">📈</div>
                    <div>
                      <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-orange-900'}`}>Beceri Planı Oluştur</h4>
                      <p className={`text-xs ${darkMode ? 'text-orange-300' : 'text-orange-700'}`}>Hedef mesleğiniz için plan yapın</p>
                    </div>
                  </Link>
                )}
                
                {kullaniciDurumu.eksikTestler.length > 0 && (
                  <Link href="/assessment/external" className={`flex items-center p-3 rounded-lg transition-colors ${
                    darkMode ? 'bg-blue-900 hover:bg-blue-800' : 'bg-blue-50 hover:bg-blue-100'
                  }`}>
                    <div className="text-blue-600 text-xl mr-3">📝</div>
                    <div>
                      <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-blue-900'}`}>Teste Devam Et</h4>
                      <p className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>{kullaniciDurumu.eksikTestler.length} test kaldı</p>
                    </div>
                  </Link>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* İstatistikler Footer */}
        <div className={`mt-8 rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-4 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            📊 Gelişim İstatistikleriniz
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 hover:shadow-lg transition-all duration-300 cursor-pointer group border border-blue-100 dark:border-blue-800">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🧪</div>
              <div className="text-2xl font-bold text-blue-600 group-hover:text-blue-700">
                {kullaniciDurumu.kisilikTestiAlindi ? '3' : '2'}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tamamlanan Test</div>
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-2 py-1 rounded-full">
                  Kişilik, İlgi, Yetkinlik testleri
                </span>
              </div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/30 hover:shadow-lg transition-all duration-300 cursor-pointer group border border-green-100 dark:border-green-800">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">💼</div>
              <div className="text-2xl font-bold text-green-600 group-hover:text-green-700">
                {aiMeslekOnerileri.length}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Meslek Önerisi</div>
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 px-2 py-1 rounded-full">
                  En uygun: UX/UI Tasarımcı (%94)
                </span>
              </div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/30 hover:shadow-lg transition-all duration-300 cursor-pointer group border border-purple-100 dark:border-purple-800">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📊</div>
              <div className="text-2xl font-bold text-purple-600 group-hover:text-purple-700">
                {kullaniciDurumu.aiAnaliziVar ? '8' : '0'}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Değer Analizi</div>
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-200 px-2 py-1 rounded-full">
                  İş değerleri ve motivasyon
                </span>
              </div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-orange-50 dark:bg-orange-900/30 hover:shadow-lg transition-all duration-300 cursor-pointer group border border-orange-100 dark:border-orange-800">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🎯</div>
              <div className="text-2xl font-bold text-orange-600 group-hover:text-orange-700">
                {kullaniciDurumu.beceriPlaniVar ? '15' : '3'}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Eksik Beceri</div>
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-200 px-2 py-1 rounded-full">
                  Geliştirilmesi gereken alanlar
                </span>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}