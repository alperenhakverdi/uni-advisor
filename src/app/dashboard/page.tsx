'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface KullaniciDurumu {
  profilTamamlandi: boolean;
  kisilikTestiAlindi: boolean;
  aiAnaliziVar: boolean;
  beceriPlaniVar: boolean;
  sonMeslekOnerisi?: string;
  tamamlanmaYuzdesi: number;
  eksikTestler: string[];
  testSonuclari?: any;
  aiAnalizi?: any;
}

export default function KullaniciPaneli() {
  const router = useRouter();
  const [kullaniciDurumu, setKullaniciDurumu] = useState<KullaniciDurumu>({
    profilTamamlandi: false,
    kisilikTestiAlindi: false,
    aiAnaliziVar: false,
    beceriPlaniVar: false,
    tamamlanmaYuzdesi: 0,
    eksikTestler: ["MBTI Testi", "Holland Testi", "Değerler Testi"],
    testSonuclari: null,
    aiAnalizi: null
  });

  const [darkMode, setDarkMode] = useState(false);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [userEmail, setUserEmail] = useState<string>('');

  // Kullanıcı verilerini yükle
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setYukleniyor(true);
      
      // User bilgisini al
      const userResponse = await fetch('/api/auth/user');
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUserEmail(userData.email || '');
      }

      // Profil kontrolü
      const profileResponse = await fetch('/api/profile');
      const profileData = await profileResponse.json();
      
      // Test sonuçlarını kontrol et
      const testResponse = await fetch('/api/assessment');
      const testData = await testResponse.json();
      
      // AI analizini kontrol et
      const analysisResponse = await fetch('/api/analysis?type=comprehensive');
      const analysisData = analysisResponse.ok ? await analysisResponse.json() : null;

      // Durumu güncelle
      const profilVar = profileData.success && profileData.data;
      const testVar = testData.success && testData.data && testData.data.length > 0;
      const analizVar = analysisData && analysisData.success && analysisData.data;
      
      // Tamamlanma yüzdesini hesapla
      let yuzde = 0;
      if (profilVar) yuzde += 25;
      if (testVar) yuzde += 35;
      if (analizVar) yuzde += 30;
      // Beceri planı için 10% ayrıldı
      
      // Eksik testleri belirle
      const tamamlananTestler = testData.data?.map((t: any) => t.test_type) || [];
      const tumTestler = ['mbti', 'holland', 'values', 'skills', 'work_style'];
      const eksikler = tumTestler.filter(t => !tamamlananTestler.includes(t));

      setKullaniciDurumu({
        profilTamamlandi: !!profilVar,
        kisilikTestiAlindi: testVar,
        aiAnaliziVar: analizVar,
        beceriPlaniVar: false,
        sonMeslekOnerisi: analizVar ? analysisData.data.ai_response?.career_matches?.[0]?.career : undefined,
        tamamlanmaYuzdesi: yuzde,
        eksikTestler: eksikler.map(t => {
          const testIsimleri: Record<string, string> = {
            'mbti': 'MBTI Kişilik Testi',
            'holland': 'Holland İlgi Testi',
            'values': 'İş Değerleri Testi',
            'skills': 'Beceri Değerlendirmesi',
            'work_style': 'Çalışma Stili Testi'
          };
          return testIsimleri[t] || t;
        }),
        testSonuclari: testData.data,
        aiAnalizi: analysisData?.data
      });

    } catch (error) {
      console.error('Veri yükleme hatası:', error);
    } finally {
      setYukleniyor(false);
    }
  };

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

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      router.push('/');
    } catch (error) {
      console.error('Çıkış yapma hatası:', error);
    }
  };

  // AI Meslek Önerileri (Sadece analiz varsa göster)
  const aiMeslekOnerileri = kullaniciDurumu.aiAnalizi?.ai_response?.career_matches || [];

  // Yükleniyor durumu
  if (yukleniyor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navbar */}
      <header className={`transition-colors duration-300 border-b ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CareerPath AI
              </Link>
              
              {/* Navigation Links */}
              <nav className="hidden md:flex space-x-6">
                <Link href="/" className={`transition-colors ${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}>
                  Ana Sayfa
                </Link>
                <Link href="/dashboard" className={`transition-colors font-medium ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Dashboard
                </Link>
                {kullaniciDurumu.kisilikTestiAlindi && (
                  <>
                    <Link href="/results" className={`transition-colors ${
                      darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}>
                      Sonuçlarım
                    </Link>
                    <Link href="/career-discovery" className={`transition-colors ${
                      darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}>
                      Meslekler
                    </Link>
                  </>
                )}
                <Link href="/chat" className={`transition-colors ${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}>
                  AI Danışman
                </Link>
              </nav>
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
                <span className={`text-sm hidden md:block ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {userEmail || 'Hoş geldiniz!'}
                </span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Aktif</span>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
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
                {kullaniciDurumu.tamamlanmaYuzdesi === 0 ? (
                  "Kariyer yolculuğunuza başlamak için ilk adımı atın!"
                ) : kullaniciDurumu.tamamlanmaYuzdesi < 100 ? (
                  <>Kariyer analizinizin <span className="font-bold">%{kullaniciDurumu.tamamlanmaYuzdesi}'i</span> tamamlandı. Hedefe çok yakınsınız!</>
                ) : (
                  "Tebrikler, analiz tamamlandı! 🎉"
                )}
              </p>
              
              {/* İlerleme Çubuğu */}
              <div className="bg-white/20 rounded-full h-3 w-80 mb-2">
                <div 
                  className="bg-white h-3 rounded-full transition-all duration-500"
                  style={{ width: `${kullaniciDurumu.tamamlanmaYuzdesi}%` }}
                ></div>
              </div>
            </div>
            
            {/* İlerleme İkonları */}
            <div className="hidden md:flex space-x-4">
              <Link href="/profile" className={`text-center cursor-pointer transition-all hover:scale-110`}>
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold ${
                  kullaniciDurumu.profilTamamlandi ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'
                }`}>
                  {kullaniciDurumu.profilTamamlandi ? '✓' : '1'}
                </div>
                <p className="text-xs">Profil</p>
              </Link>
              <Link href="/assessment/external" className={`text-center cursor-pointer transition-all hover:scale-110`}>
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold ${
                  kullaniciDurumu.kisilikTestiAlindi ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'
                }`}>
                  {kullaniciDurumu.kisilikTestiAlindi ? '✓' : '2'}
                </div>
                <p className="text-xs">Test</p>
              </Link>
              <div className={`text-center ${kullaniciDurumu.aiAnaliziVar ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold ${
                  kullaniciDurumu.aiAnaliziVar ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'
                }`}>
                  {kullaniciDurumu.aiAnaliziVar ? '✓' : '3'}
                </div>
                <p className="text-xs">Analiz</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kısaca Yol Haritanız - Sadece analiz varsa göster */}
        {kullaniciDurumu.aiAnaliziVar && kullaniciDurumu.sonMeslekOnerisi && (
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
              Şu anda <span className="font-bold">{kullaniciDurumu.sonMeslekOnerisi}</span> olma yolculuğundasınız. 
              AI destekli danışmanla planlamanızı oluşturun ve hedefinize ulaşın.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sol Kolon - Ana İçerik */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Test Yapılmadıysa Başlangıç Kartı */}
            {!kullaniciDurumu.kisilikTestiAlindi && (
              <div className={`rounded-xl shadow-lg p-6 border-l-4 border-blue-500 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Kariyer Yolculuğunuza Başlayın!
                  </h3>
                  <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Kişilik testlerinizi tamamlayarak size özel kariyer önerilerini keşfedin.
                  </p>
                  <div className="space-y-4 max-w-md mx-auto">
                    <Link 
                      href="/assessment/external"
                      className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-semibold text-lg shadow-lg"
                    >
                      🧠 Kişilik Testine Başla
                    </Link>
                    <Link 
                      href="/profile"
                      className={`block border-2 border-gray-300 px-6 py-3 rounded-lg transition-colors font-medium ${
                        darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      📝 Önce Profilimi Tamamla
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* AI Meslek Önerileri - Sadece analiz varsa */}
            {kullaniciDurumu.aiAnaliziVar && aiMeslekOnerileri.length > 0 && (
              <div className={`rounded-xl shadow-lg p-6 ${
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
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors font-medium text-sm"
                  >
                    Tüm Sonuçları Gör
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {aiMeslekOnerileri.slice(0, 3).map((meslek: any, index: number) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {meslek.career}
                          </h4>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            💰 Maaş: {meslek.salary_range}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">%{meslek.match_percentage}</div>
                          <div className="text-xs text-gray-500">uygunluk</div>
                        </div>
                      </div>
                      <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {meslek.reasoning}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${meslek.match_percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Eksik Testler Bildirimi */}
            {kullaniciDurumu.kisilikTestiAlindi && kullaniciDurumu.eksikTestler.length > 0 && (
              <div className={`rounded-xl shadow-lg p-6 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  📋 Tamamlanmamış Testler
                </h3>
                <div className="space-y-2">
                  {kullaniciDurumu.eksikTestler.map((test, index) => (
                    <div key={index} className={`p-3 rounded-lg flex items-center justify-between ${
                      darkMode ? 'bg-gray-700' : 'bg-yellow-50'
                    }`}>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{test}</span>
                      <Link 
                        href="/assessment/external"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Tamamla →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
          
          {/* Sağ Kolon - Sidebar */}
          <div className="space-y-6">
            
            {/* AI Danışman */}
            <div className={`rounded-xl shadow-lg p-6 ${
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
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-semibold inline-block"
                >
                  💬 Hemen Konuş
                </Link>
              </div>
            </div>

            {/* Hızlı Erişim */}
            <div className={`rounded-xl shadow-lg p-6 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                ⚡ Hızlı Erişim
              </h3>
              <div className="space-y-3">
                {!kullaniciDurumu.profilTamamlandi && (
                  <Link href="/profile" className={`flex items-center p-3 rounded-lg transition-colors ${
                    darkMode ? 'bg-blue-900 hover:bg-blue-800' : 'bg-blue-50 hover:bg-blue-100'
                  }`}>
                    <div className="text-blue-600 text-xl mr-3">👤</div>
                    <div>
                      <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-blue-900'}`}>Profili Tamamla</h4>
                      <p className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>Kişiselleştirilmiş öneriler için</p>
                    </div>
                  </Link>
                )}
                
                {!kullaniciDurumu.kisilikTestiAlindi && (
                  <Link href="/assessment/external" className={`flex items-center p-3 rounded-lg transition-colors ${
                    darkMode ? 'bg-purple-900 hover:bg-purple-800' : 'bg-purple-50 hover:bg-purple-100'
                  }`}>
                    <div className="text-purple-600 text-xl mr-3">🧠</div>
                    <div>
                      <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-purple-900'}`}>Teste Başla</h4>
                      <p className={`text-xs ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>MBTI & Holland testleri</p>
                    </div>
                  </Link>
                )}
                
                {kullaniciDurumu.aiAnaliziVar && (
                  <Link href="/career-discovery" className={`flex items-center p-3 rounded-lg transition-colors ${
                    darkMode ? 'bg-green-900 hover:bg-green-800' : 'bg-green-50 hover:bg-green-100'
                  }`}>
                    <div className="text-green-600 text-xl mr-3">🔍</div>
                    <div>
                      <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-green-900'}`}>Meslek Keşfi</h4>
                      <p className={`text-xs ${darkMode ? 'text-green-300' : 'text-green-700'}`}>Tüm meslekleri incele</p>
                    </div>
                  </Link>
                )}
              </div>
            </div>

            {/* İstatistikler - Sadece veri varsa göster */}
            {kullaniciDurumu.kisilikTestiAlindi && (
              <div className={`rounded-xl shadow-lg p-6 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  📊 İstatistikleriniz
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Tamamlanan Test</span>
                    <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {kullaniciDurumu.testSonuclari?.length || 0}
                    </span>
                  </div>
                  {kullaniciDurumu.aiAnaliziVar && (
                    <div className="flex justify-between">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Meslek Önerisi</span>
                      <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {aiMeslekOnerileri.length}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>İlerleme</span>
                    <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      %{kullaniciDurumu.tamamlanmaYuzdesi}
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </main>
    </div>
  );
}