import Link from 'next/link';

export default function AnaSayfa() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-4">
        {/* Ana Başlık */}
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          CareerPath AI
        </h1>
        <h2 className="text-2xl font-medium text-gray-700 mb-4">
          Akıllı Kariyer & Eğitim Danışmanı
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Kişiselleştirilmiş kariyer planlama ve eğitim rehberlik platformu
        </p>
        
        {/* Ana Akış Butonları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Kişilik Testi */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-blue-600 text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Kişilik Testi Al
            </h3>
            <p className="text-gray-600 mb-4">
              Profesyonel kişilik testleri ile size uygun meslekleri keşfedin
            </p>
            <Link 
              href="/assessment"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
            >
              Teste Başla
            </Link>
          </div>

          {/* Üniversite Planlama */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-green-600 text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Üniversite Seçmek İstiyorum
            </h3>
            <p className="text-gray-600 mb-4">
              Objektif verilerle en uygun üniversite ve bölümü bulun
            </p>
            <Link 
              href="/university-matcher"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block"
            >
              Üniversite Planlayıcısı
            </Link>
          </div>

          {/* Beceri Geliştirme */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-purple-600 text-4xl mb-4">📈</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Becerilerimi Geliştirmek İstiyorum
            </h3>
            <p className="text-gray-600 mb-4">
              Kişiselleştirilmiş öğrenme yolu ile hedeflediğiniz becerileri kazanın
            </p>
            <Link 
              href="/skills-development"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors inline-block"
            >
              Beceri Geliştirme
            </Link>
          </div>

        </div>

        {/* Alt Butonlar */}
        <div className="space-x-4">
          <Link 
            href="/login"
            className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors inline-block"
          >
            Giriş Yap
          </Link>
          <Link 
            href="/register"
            className="bg-gray-100 text-gray-900 border border-gray-300 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors inline-block"
          >
            Kayıt Ol
          </Link>
        </div>

        {/* Özellikler */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-2xl mb-2">🧠</div>
            <h4 className="font-semibold text-gray-900">AI Destekli</h4>
            <p className="text-sm text-gray-600">Yapay zeka ile kişiselleştirilmiş öneriler</p>
          </div>
          <div>
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-semibold text-gray-900">Objektif Veriler</h4>
            <p className="text-sm text-gray-600">URAP sıralamaları ve memnuniyet verileri</p>
          </div>
          <div>
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-semibold text-gray-900">Bilimsel Testler</h4>
            <p className="text-sm text-gray-600">16PF, Holland ve DISC testleri</p>
          </div>
          <div>
            <div className="text-2xl mb-2">🚀</div>
            <h4 className="font-semibold text-gray-900">Sürekli Rehberlik</h4>
            <p className="text-sm text-gray-600">7/24 AI mentor desteği</p>
          </div>
        </div>

      </div>
    </div>
  );
} 