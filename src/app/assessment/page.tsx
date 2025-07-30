'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function DegerlendirmeSayfasi() {
  const [secilenYontem, setSecilenYontem] = useState<'hizli' | 'detayli' | null>(null);

  if (secilenYontem === null) {
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
                Kariyer Değerlendirme
              </h1>
              <div></div>
            </div>
          </div>
        </header>

        {/* Seçim Sayfası */}
        <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hangi Yöntemi Tercih Ediyorsunuz?
            </h2>
            <p className="text-lg text-gray-600">
              Size en uygun değerlendirme yöntemini seçin
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Hızlı Değerlendirme */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-transparent hover:border-blue-500 transition-colors cursor-pointer"
                 onClick={() => setSecilenYontem('hizli')}>
              <div className="text-center">
                <div className="text-blue-600 text-5xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Hızlı Değerlendirme
                </h3>
                <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mb-4">
                  5-10 Dakika
                </div>
                
                <div className="text-left space-y-3 mb-6">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Temel kişilik analizi</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">İlgi alanı tespiti</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Genel meslek önerileri</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Hemen sonuç alın</span>
                  </div>
                </div>

                <button 
                  onClick={() => setSecilenYontem('hizli')}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Hızlı Teste Başla
                </button>
              </div>
            </div>

            {/* Detaylı Analiz */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-transparent hover:border-purple-500 transition-colors cursor-pointer"
                 onClick={() => setSecilenYontem('detayli')}>
              <div className="text-center">
                <div className="text-purple-600 text-5xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Detaylı Analiz
                </h3>
                <div className="text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full inline-block mb-4">
                  15-25 Dakika
                </div>
                
                <div className="text-left space-y-3 mb-6">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">16PF Kişilik Testi</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Holland RIASEC Modeli</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">DISC Analizi (Opsiyonel)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">AI destekli detaylı rapor</span>
                  </div>
                </div>

                <button 
                  onClick={() => setSecilenYontem('detayli')}
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                >
                  Detaylı Analize Başla
                </button>
              </div>
            </div>

          </div>

          {/* Bilgilendirme */}
          <div className="mt-12 bg-blue-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-900 mb-3">
              💡 Hangi Yöntemi Seçmeliyim?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Hızlı Değerlendirme İdeal Eğer:</h5>
                <ul className="text-blue-700 space-y-1">
                  <li>• Genel bir fikir almak istiyorsunuz</li>
                  <li>• Zamanınız kısıtlı</li>
                  <li>• İlk kez kariyer keşfi yapıyorsunuz</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Detaylı Analiz İdeal Eğer:</h5>
                <ul className="text-blue-700 space-y-1">
                  <li>• Derinlemesine analiz istiyorsunuz</li>
                  <li>• Önemli kariyer kararı vereceksiniz</li>
                  <li>• Bilimsel testlere güveniyorsunuz</li>
                </ul>
              </div>
            </div>
          </div>

        </main>
      </div>
    );
  }

  // Hızlı değerlendirme seçildiyse mevcut testimizi göster
  if (secilenYontem === 'hizli') {
    return <HizliDegerlendirme onGeriDon={() => setSecilenYontem(null)} />;
  }

  // Detaylı analiz seçildiyse yönlendirme sayfasını göster
  if (secilenYontem === 'detayli') {
    return <DetayliAnaliz onGeriDon={() => setSecilenYontem(null)} />;
  }
}

// Hızlı Değerlendirme Komponenti (Mevcut testimiz)
function HizliDegerlendirme({ onGeriDon }: { onGeriDon: () => void }) {
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
      soru: "İdeal çalışma tempoiniz nasıl olmalı?",
      secenekler: [
        "Hızlı tempolu ve dinamik",
        "Sakin ve düzenli",
        "Proje bazlı yoğun dönemler",
        "Esnek ve özgür çalışma"
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
    console.log("Hızlı test cevapları:", cevaplar);
    alert("Test tamamlandı! AI analizi yapılıyor...");
    // Burada results sayfasına yönlendirebiliriz
  };

  const ilerlemeYuzdesi = ((mevcutSoru + 1) / sorular.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={onGeriDon}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Geri Dön
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              Hızlı Kariyer Değerlendirmesi
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

      {/* Soru İçeriği */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-8">
          
          <div className="mb-8">
            <h2 className="text-2xl font-medium text-gray-900 mb-6">
              {sorular[mevcutSoru].soru}
            </h2>
            
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

          {/* Navigasyon */}
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
              Önceki
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
                Sonraki
              </button>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

// Detaylı Analiz Komponenti (Test yönlendirme)
function DetayliAnaliz({ onGeriDon }: { onGeriDon: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={onGeriDon}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Geri Dön
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              Detaylı Kişilik Analizi
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
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  16 Personalities Test (Ücretsiz)
                </h3>
                <p className="text-gray-600 mb-3">
                  En popüler kişilik testi. MBTI tabanlı analiz ile 16 farklı kişilik tipini belirler.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>⏱ 12 dakika</span>
                  <span>🌟 En popüler</span>
                  <span>📊 MBTI tabanlı</span>
                </div>
              </div>
              <div className="ml-6">
                <a 
                  href="https://www.16personalities.com/tr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Teste Git
                </a>
              </div>
            </div>
          </div>

          {/* Holland Test */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Holland Kariyer Testi (RIASEC)
                </h3>
                <p className="text-gray-600 mb-3">
                  Kariyer seçimi için özel tasarlanmış test. 6 temel kişilik tipini belirler.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>⏱ 15 dakika</span>
                  <span>🎯 Kariyer odaklı</span>
                  <span>📈 RIASEC modeli</span>
                </div>
              </div>
              <div className="ml-6">
                <a 
                  href="https://www.truity.com/test/holland-code-career-test" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Teste Git
                </a>
              </div>
            </div>
          </div>

          {/* DISC Test */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  DISC Kişilik Analizi
                </h3>
                <p className="text-gray-600 mb-3">
                  İş hayatında davranış tarzınızı analiz eder. Liderlik ve ekip çalışması odaklı.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>⏱ 10 dakika</span>
                  <span>💼 İş odaklı</span>
                  <span>👥 Takım çalışması</span>
                </div>
              </div>
              <div className="ml-6">
                <a 
                  href="https://www.123test.com/disc-personality-test/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Teste Git
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Sonuç Girişi */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Test Sonucunuzu Aldınız mı?
          </h3>
          <p className="mb-6">
            Test sonucunuzu girin ve AI destekli detaylı analiz alın
          </p>
          <Link 
            href="/assessment/external"
            className="bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Sonucumu Gir ve Analiz Al
          </Link>
        </div>

      </main>
    </div>
  );
}