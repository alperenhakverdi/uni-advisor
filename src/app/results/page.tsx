import Link from 'next/link';

export default function SonuclarSayfasi() {
  // Mock veri - gerçekte API'den gelecek
  const analizSonucu = {
    genelPuan: 85,
    uygunBolumler: [
      { 
        isim: "Bilgisayar Mühendisliği", 
        uygunlukOrani: 92, 
        universite: "İTÜ",
        tabanPuan: 450,
        aciklama: "Matematik ve problem çözme becerileriniz bu bölüm için çok uygun"
      },
      { 
        isim: "Endüstri Mühendisliği", 
        uygunlukOrani: 88, 
        universite: "ODTÜ",
        tabanPuan: 445,
        aciklama: "Analitik düşünce yapınız ve liderlik potansiyeliniz öne çıkıyor"
      },
      { 
        isim: "İktisat", 
        uygunlukOrani: 82, 
        universite: "Boğaziçi",
        tabanPuan: 420,
        aciklama: "Sosyal bilimler ilginiz ve matematiksel yeteneğiniz dengeli"
      }
    ],
    beceriAnalizi: {
      matematiksel: 90,
      sozel: 75,
      analitik: 88,
      yaraticilik: 70,
      liderlik: 82
    },
    gelisimAlanlari: [
      "Sosyal iletişim becerilerini geliştirin",
      "Yaratıcı düşünme egzersizleri yapın",
      "Takım çalışması deneyiminizi artırın"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/dashboard"
              className="text-blue-600 hover:text-blue-800"
            >
              ← Dashboard'a Dön
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              Analiz Sonuçları
            </h1>
            <div className="flex space-x-2">
              <button className="text-green-600 hover:text-green-800">
                PDF İndir
              </button>
              <button className="text-blue-600 hover:text-blue-800">
                Paylaş
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Genel Skor */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Genel Uygunluk Puanınız
            </h2>
            <div className="relative inline-flex items-center justify-center w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-300"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - analizSonucu.genelPuan / 100)}`}
                  className="text-blue-600"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">
                  {analizSonucu.genelPuan}%
                </span>
              </div>
            </div>
            <p className="text-gray-600 mt-4">
              Profiliniz ve tercihleriniz analiz edildi
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sol Kolon - Önerilen Bölümler */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Size Önerilen Bölümler
                </h3>
              </div>
              <div className="p-6 space-y-6">
                {analizSonucu.uygunBolumler.map((bolum, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">
                          {bolum.isim}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {bolum.universite} - Taban Puan: {bolum.tabanPuan}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-green-600">
                          %{bolum.uygunlukOrani}
                        </span>
                        <p className="text-xs text-gray-500">uygunluk</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">
                      {bolum.aciklama}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${bolum.uygunlukOrani}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ Kolon - Beceri Analizi */}
          <div className="space-y-6">
            
            {/* Beceri Analizi */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Beceri Analizi
              </h3>
              <div className="space-y-4">
                {Object.entries(analizSonucu.beceriAnalizi).map(([beceri, puan]) => (
                  <div key={beceri}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {beceri === 'matematiksel' ? 'Matematiksel' :
                         beceri === 'sozel' ? 'Sözel' :
                         beceri === 'analitik' ? 'Analitik' :
                         beceri === 'yaraticilik' ? 'Yaratıcılık' :
                         'Liderlik'}
                      </span>
                      <span className="text-sm text-gray-600">%{puan}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${puan}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gelişim Önerileri */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Gelişim Önerileri
              </h3>
              <div className="space-y-3">
                {analizSonucu.gelisimAlanlari.map((oneri, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{oneri}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Eylem Butonları */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                Sonraki Adımlar
              </h3>
              <div className="space-y-3">
                <Link
                  href="/chat"
                  className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  AI Danışmanla Konuş
                </Link>
                <Link
                  href="/assessment"
                  className="block w-full bg-white text-blue-600 border border-blue-600 text-center py-2 px-4 rounded-md hover:bg-blue-50 transition-colors"
                >
                  Yeni Test Al
                </Link>
                <Link
                  href="/profile"
                  className="block w-full bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Profili Güncelle
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}