import Link from 'next/link';

export default function KisilikTestiSayfasi() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/dashboard"
              className="text-blue-600 hover:text-blue-800"
            >
              ← Dashboard'a Dön
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              Kişilik Testi Seçimi
            </h1>
            <div></div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Profesyonel Kişilik Testleri
          </h2>
          <p className="text-lg text-gray-600">
            Aşağıdaki testlerden birini alın ve sonucunu sisteme girin
          </p>
        </div>

        <div className="space-y-6">
          
          {/* 16 Personalities */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <div className="text-3xl mr-4">🧠</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      16 Personalities Test (Önerilen)
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                        Ücretsiz
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                        En Popüler
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-3">
                  En popüler kişilik testi. MBTI tabanlı analiz ile 16 farklı kişilik tipini belirler.
                  Dünya çapında milyonlarca kişi tarafından kullanılmaktadır.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                    </svg>
                    12 dakika
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    MBTI tabanlı
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                    </svg>
                    60+ soru
                  </span>
                </div>
              </div>
              <div className="ml-6">
                <a 
                  href="https://www.16personalities.com/tr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                >
                  Teste Git →
                </a>
              </div>
            </div>
          </div>

          {/* Holland Test */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <div className="text-3xl mr-4">🎯</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Holland Kariyer Testi (RIASEC)
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                        Ücretsiz
                      </span>
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium">
                        Kariyer Odaklı
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-3">
                  Kariyer seçimi için özel tasarlanmış test. 6 temel kişilik tipini belirler ve 
                  hangi meslek gruplarının size uygun olduğunu gösterir.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                    </svg>
                    15 dakika
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    RIASEC modeli  
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                    </svg>
                    120+ soru
                  </span>
                </div>
              </div>
              <div className="ml-6">
                <a 
                  href="https://www.truity.com/test/holland-code-career-test" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Teste Git →
                </a>
              </div>
            </div>
          </div>

          {/* DISC Test */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <div className="text-3xl mr-4">💼</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      DISC Kişilik Analizi
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                        Ücretsiz
                      </span>
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full font-medium">
                        İş Odaklı
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-3">
                  İş hayatında davranış tarzınızı analiz eder. Liderlik ve ekip çalışması 
                  özelliklerinizi belirler, iş hayatına yönelik öngörüler sunar.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                    </svg>
                    10 dakika
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    DISC modeli
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                    </svg>
                    24 soru
                  </span>
                </div>
              </div>
              <div className="ml-6">
                <a 
                  href="https://www.123test.com/disc-personality-test/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Teste Git →
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Sonuç Girişi */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white text-center">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-white mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4">
            Test Sonucunuzu Aldınız mı?
          </h3>
          <p className="text-purple-100 mb-6">
            Test sonucunuzu girin ve AI destekli detaylı kariyer analizi alın
          </p>
          <Link 
            href="/assessment/external"
            className="bg-white text-purple-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
            Sonucumu Gir ve Analiz Al
          </Link>
        </div>

                  {/* Sistemimiz Hakkında */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-900 mb-3">
              💡 Sistemimiz Nasıl Çalışır?
            </h4>
            <div className="text-blue-800 space-y-3">
              <p>• <span className="font-medium">Entegre Analiz:</span> Yukarıdaki testlerden birini veya birkaçını alabilirsiniz</p>
              <p>• <span className="font-medium">AI Destekli Değerlendirme:</span> Tüm test sonuçlarınız sistemimiz tarafından bütünsel olarak analiz edilir</p>
              <p>• <span className="font-medium">Kapsamlı Rapor:</span> Birden fazla test sonucu daha detaylı ve güvenilir analiz sağlar</p>
              <p>• <span className="font-medium">Kişiselleştirilmiş Öneriler:</span> Her test farklı açılardan kişiliğinizi değerlendirerek tam bir profil çıkarır</p>
            </div>
          </div>

      </main>
    </div>
  );
}