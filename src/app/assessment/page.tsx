'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function DegerlendirmeSayfasi() {
  const [mevcutSoru, setMevcutSoru] = useState(0);
  const [cevaplar, setCevaplar] = useState<{ [key: number]: string }>({});

  const sorular = [
    {
      id: 1,
      soru: "Hangi alanda çalışmayı daha çok seviyorsunuz?",
      secenekler: [
        "Sayısal alanlar (Matematik, Fizik, Mühendislik)",
        "Sözel alanlar (Edebiyat, Tarih, Dil)",
        "Eşit ağırlık (Hukuk, İşletme, İktisat)",
        "Sanat ve tasarım alanları"
      ]
    },
    {
      id: 2,
      soru: "Gelecekte hangi çalışma ortamını tercih edersiniz?",
      secenekler: [
        "Ofis ortamında masabaşı çalışma",
        "Sahada aktif çalışma",
        "Laboratuvar ve araştırma ortamı",
        "Yaratıcı ve sanatsal ortamlar"
      ]
    },
    {
      id: 3,
      soru: "Problem çözerken hangi yaklaşımı tercih edersiniz?",
      secenekler: [
        "Mantıklı ve analitik düşünme",
        "Yaratıcı ve sezgisel çözümler",
        "Ekip çalışması ve işbirliği",
        "Bireysel araştırma ve inceleme"
      ]
    },
    {
      id: 4,
      soru: "Hangi konularda kendinizi daha başarılı buluyorsunuz?",
      secenekler: [
        "Matematik ve fen bilimleri",
        "Dil ve iletişim becerileri",
        "Liderlik ve organizasyon",
        "Sanatsal ve estetik çalışmalar"
      ]
    },
    {
      id: 5,
      soru: "Üniversite seçiminde en önemli faktör hangisi?",
      secenekler: [
        "Bölümün iş olanakları",
        "Üniversitenin prestiji",
        "Şehir ve kampüs yaşamı",
        "Aile ve çevre beklentileri"
      ]
    }
  ];

  const cevapSec = (secenekIndex: number) => {
    setCevaplar({
      ...cevaplar,
      [mevcutSoru]: sorular[mevcutSoru].secenekler[secenekIndex]
    });
  };

  const sonrakiSoru = () => {
    if (mevcutSoru < sorular.length - 1) {
      setMevcutSoru(mevcutSoru + 1);
    }
  };

  const oncekiSoru = () => {
    if (mevcutSoru > 0) {
      setMevcutSoru(mevcutSoru - 1);
    }
  };

  const testiTamamla = () => {
    console.log("Test cevapları:", cevaplar);
    // Burada sonuçlar sayfasına yönlendirme yapılacak
    alert("Test tamamlandı! Sonuçlar değerlendiriliyor...");
  };

  const ilerlemeYuzdesi = ((mevcutSoru + 1) / sorular.length) * 100;

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
              Değerlendirme Testi
            </h1>
            <div className="text-sm text-gray-600">
              {mevcutSoru + 1} / {sorular.length}
            </div>
          </div>
        </div>
      </header>

      {/* İlerleme Çubuğu */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${ilerlemeYuzdesi}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              %{Math.round(ilerlemeYuzdesi)} tamamlandı
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-8">
          
          {/* Soru */}
          <div className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-6">
              {sorular[mevcutSoru].soru}
            </h2>
            
            {/* Seçenekler */}
            <div className="space-y-3">
              {sorular[mevcutSoru].secenekler.map((secenek, index) => (
                <button
                  key={index}
                  onClick={() => cevapSec(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    cevaplar[mevcutSoru] === secenek
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      cevaplar[mevcutSoru] === secenek
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {cevaplar[mevcutSoru] === secenek && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                      )}
                    </div>
                    <span>{secenek}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigasyon Butonları */}
          <div className="flex justify-between items-center">
            <button
              onClick={oncekiSoru}
              disabled={mevcutSoru === 0}
              className={`px-6 py-2 rounded-md ${
                mevcutSoru === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Önceki Soru
            </button>

            <div className="text-sm text-gray-500">
              Soru {mevcutSoru + 1} / {sorular.length}
            </div>

            {mevcutSoru === sorular.length - 1 ? (
              <button
                onClick={testiTamamla}
                disabled={!cevaplar[mevcutSoru]}
                className={`px-6 py-2 rounded-md ${
                  !cevaplar[mevcutSoru]
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                Testi Tamamla
              </button>
            ) : (
              <button
                onClick={sonrakiSoru}
                disabled={!cevaplar[mevcutSoru]}
                className={`px-6 py-2 rounded-md ${
                  !cevaplar[mevcutSoru]
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Sonraki Soru
              </button>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}