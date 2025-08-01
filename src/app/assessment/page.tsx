import Link from 'next/link';

export default function KisilikTestiSayfasi() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/dashboard"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Dashboard'a Dön
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              Kariyer Analizi
            </h1>
            <div></div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Ana Başlık ve Açıklama */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            🧠 Kişiliğini Keşfet – Kariyerine Yön Ver
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Birkaç basit adımda seni en iyi yansıtan meslekleri bulmana yardımcı oluyoruz. 
            Önce testini seç, ardından yapay zeka analizimizi başlat.
          </p>
        </div>

        {/* Test Kartları */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* 16 Personalities Test */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">🧠</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    16 Personalities Test
                  </h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                      Ücretsiz
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full font-medium">
                      Zorunlu
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Kariyerine en uygun kişilik tipi için ideal başlangıç. Bu test dünya çapında 
                milyonlarca kişi tarafından kullanılmaktadır ve kişiliğinin derinliklerini keşfetmeni sağlar.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                  </svg>
                  12 dakika
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  60+ soru, MBTI tabanlı
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                  </svg>
                  Milyonlarca kullanıcı
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="https://www.16personalities.com/tr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-center btn-transition"
                >
                  🚀 Teste Git
                </a>
                <Link
                  href="/assessment/external"
                  className="flex-1 bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-center border border-gray-300 btn-transition"
                >
                  ✅ Sonucum Var
                </Link>
              </div>
            </div>
          </div>

          {/* Holland RIASEC Test */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">🎯</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Holland Kariyer Testi
                  </h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                      Ücretsiz
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full font-medium">
                      Zorunlu
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                İlgi alanlarını ve meslek tercihlerini belirleyen en güvenilir test. RIASEC modeli 
                ile hangi meslek gruplarının sana uygun olduğunu keşfet.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                  </svg>
                  15 dakika
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  120+ soru, RIASEC modeli
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  Kariyer odaklı analiz
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="https://www.truity.com/test/holland-code-career-test" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold text-center btn-transition"
                >
                  🚀 Teste Git
                </a>
                <Link
                  href="/assessment/external"
                  className="flex-1 bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-center border border-gray-300 btn-transition"
                >
                  ✅ Sonucum Var
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Testini Tamamladın mı? Bölümü */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Testini Tamamladın mı?
              </h3>
              <p className="text-gray-600 text-lg">
                Sonucunu gir, AI analizine geç. 5 dakikada kişiselleştirilmiş kariyer önerilerini al.
              </p>
            </div>
            
            <Link 
              href="/assessment/external"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
              Sonucumu Gireceğim
            </Link>
          </div>
        </div>

        {/* Sistem Nasıl Çalışır */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              💡 Sistem Nasıl Çalışır?
            </h3>
            <p className="text-gray-600">
              Adım adım rehberlik ile kişiselleştirilmiş kariyer analizi
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Adım 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">👤</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">1. Testini Çöz</h4>
                <p className="text-sm text-gray-600">
                  MBTI ve Holland testlerini tamamla (toplam 25 dakika)
                </p>
              </div>
            </div>

            {/* Adım 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">🧪</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">2. Sonucunu Gir</h4>
                <p className="text-sm text-gray-600">
                  Test sonuçlarını sistemimize güvenli şekilde gir
                </p>
              </div>
            </div>

            {/* Adım 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">📝</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">3. Özel Testler</h4>
                <p className="text-sm text-gray-600">
                  İş değerleri, çalışma tercihleri ve beceri değerlendirmesi
                </p>
              </div>
            </div>

            {/* Adım 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">🤖</span>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">4. AI Analizi</h4>
                <p className="text-sm text-gray-600">
                  Yapay zeka ile kişiselleştirilmiş meslek önerileri al
                </p>
              </div>
            </div>

          </div>

          {/* Süre Bilgisi */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-sm">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
              </svg>
              <span className="text-gray-700 font-medium">Toplam süre: ~30 dakika</span>
            </div>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="mt-12 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
              <h4 className="text-lg font-semibold text-yellow-900">Önemli Not</h4>
            </div>
            <p className="text-yellow-800">
              En doğru sonuçlar için <strong>hem MBTI hem de Holland</strong> testlerini tamamlamanız gerekmektedir. 
              Bu testler tamamen ücretsizdir ve kişisel verileriniz güvenle korunmaktadır.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}