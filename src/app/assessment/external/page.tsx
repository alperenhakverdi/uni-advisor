'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TestSonucuSayfasi() {
  const [secilenTest, setSecilenTest] = useState<string>('');
  const [testSonucu, setTestSonucu] = useState<string>('');
  const [analizediliyor, setAnalizediliyor] = useState(false);
  const [analizTamamlandi, setAnalizTamamlandi] = useState(false);

  const testTurleri = [
    {
      id: '16personalities',
      isim: '16 Personalities (MBTI)',
      ornekSonuc: 'ENFP-A (Kampanyacı)',
      aciklama: 'Örnek: INTJ-T, ENFP-A, ISFJ-T gibi'
    },
    {
      id: 'holland',
      isim: 'Holland RIASEC Testi',
      ornekSonuc: 'RIA (Realistic-Investigative-Artistic)',
      aciklama: 'Örnek: RSE, IAE, ASE gibi 3 harf kombinasyonu'
    },
    {
      id: 'disc',
      isim: 'DISC Analizi',
      ornekSonuc: 'D: Yüksek, I: Orta, S: Düşük, C: Yüksek',
      aciklama: 'Her boyut için Yüksek/Orta/Düşük değerler'
    }
  ];

  const analizBaslat = async () => {
    if (!secilenTest || !testSonucu) {
      alert('Lütfen test türünü seçin ve sonucunuzu girin.');
      return;
    }

    setAnalizediliyor(true);

    // Simüle edilmiş AI analizi (gerçekte Gemini API çağrısı)
    setTimeout(() => {
      setAnalizediliyor(false);
      setAnalizTamamlandi(true);
    }, 3000);
  };

  if (analizTamamlandi) {
    return <AnalizSonucu testTuru={secilenTest} sonuc={testSonucu} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/assessment"
              className="text-blue-600 hover:text-blue-800"
            >
              ← Assessment'a Dön
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              Test Sonucu Analizi
            </h1>
            <div></div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Başlık */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Test Sonucunuzu Girin
          </h2>
          <p className="text-lg text-gray-600">
            AI analizimiz ile kişiselleştirilmiş kariyer önerilerinizi alın
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          
          {/* Test Türü Seçimi */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              1. Hangi Testi Aldınız?
            </h3>
            <div className="space-y-3">
              {testTurleri.map((test) => (
                <div key={test.id} 
                     className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                       secilenTest === test.id 
                         ? 'border-blue-500 bg-blue-50' 
                         : 'border-gray-300 hover:border-gray-400'
                     }`}
                     onClick={() => setSecilenTest(test.id)}>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      secilenTest === test.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {secilenTest === test.id && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{test.isim}</h4>
                      <p className="text-sm text-gray-600">{test.aciklama}</p>
                      <p className="text-sm text-blue-600 mt-1">Örnek: {test.ornekSonuc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Değerler ve Çalışma Tercihleri */}
<div className="mb-8">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">
    2. Değerler ve Çalışma Tercihleri
  </h3>
  <p className="text-sm text-gray-600 mb-4">
    Aşağıdaki değerleri sizin için önem derecesine göre puanlayın (1: Hiç önemli değil, 5: Çok önemli)
  </p>
  
  <div className="space-y-4">
    {[
      { 
        key: 'maas', 
        label: 'Yüksek Maaş ve Finansal Güvenlik', 
        icon: '💰',
        aciklama: 'İyi bir gelir seviyesi ve ekonomik güvence'
      },
      { 
        key: 'denge', 
        label: 'İş-Yaşam Dengesi', 
        icon: '⚖️',
        aciklama: 'Esnek çalışma saatleri ve kişisel zamanınızı koruma'
      },
      { 
        key: 'yaraticilik', 
        label: 'Yaratıcılık ve İnovasyon', 
        icon: '🎨',
        aciklama: 'Yeni fikirler üretme ve yaratıcı projeler yapma'
      },
      { 
        key: 'yardim', 
        label: 'İnsanlara Yardım Etme', 
        icon: '🤝',
        aciklama: 'Topluma fayda sağlama ve başkalarının hayatını iyileştirme'
      },
      { 
        key: 'prestij', 
        label: 'Prestij ve Tanınırlık', 
        icon: '👑',
        aciklama: 'Saygın bir pozisyonda olma ve toplumsal statü'
      },
      { 
        key: 'guvenlik', 
        label: 'İş Güvenliği ve Kararlılık', 
        icon: '🛡️',
        aciklama: 'İşsiz kalma riski düşük, istikrarlı bir kariyer'
      },
      { 
        key: 'ozgurluk', 
        label: 'Özgürlük ve Bağımsızlık', 
        icon: '🕊️',
        aciklama: 'Kendi kararlarınızı alma ve serbest çalışma'
      },
      { 
        key: 'gelisim', 
        label: 'Kişisel Gelişim ve Öğrenme', 
        icon: '📚',
        aciklama: 'Sürekli yeni beceriler kazanma ve kendini geliştirme'
      }
    ].map((deger) => (
      <div key={deger.key} className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <span className="text-2xl mr-3">{deger.icon}</span>
            <div>
              <h4 className="font-medium text-gray-900">{deger.label}</h4>
              <p className="text-sm text-gray-600">{deger.aciklama}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((puan) => (
              <button
                key={puan}
                type="button"
                className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:bg-blue-500 focus:text-white transition-colors text-sm font-medium"
              >
                {puan}
              </button>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

{/* Çalışma Tarzı Tercihleri */}
<div className="mb-8">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">
    3. Çalışma Tarzı Tercihleri
  </h3>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tercih Ettiğiniz Çalışma Ortamı
      </label>
      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">Seçiniz</option>
        <option value="ofis">Kapalı Ofis Ortamı</option>
        <option value="acik-ofis">Açık Ofis / Co-working</option>
        <option value="uzaktan">Uzaktan Çalışma</option>
        <option value="saha">Saha / Dış Mekan</option>
        <option value="hibrit">Hibrit (Ofis + Ev)</option>
        <option value="serbest">Serbest Meslek</option>
      </select>
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Çalışma Şekli Tercihi
      </label>
      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">Seçiniz</option>
        <option value="bireysel">Bireysel Çalışma</option>
        <option value="takim">Takım Çalışması</option>
        <option value="liderlik">Liderlik Pozisyonu</option>
        <option value="karma">Karma (Bireysel + Takım)</option>
      </select>
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Çalışma Temposu
      </label>
      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">Seçiniz</option>
        <option value="yavas">Sakin ve Düzenli</option>
        <option value="orta">Orta Tempo</option>
        <option value="hizli">Hızlı ve Dinamik</option>
        <option value="proje-bazli">Proje Bazlı Yoğunluk</option>
      </select>
    </div>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Seyahat Etme İsteği
      </label>
      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">Seçiniz</option>
        <option value="hic">Seyahat İstemiyorum</option>
        <option value="az">Nadiren (Ayda 1-2 gün)</option>
        <option value="orta">Bazen (Haftada 1-2 gün)</option>
        <option value="cok">Sık Sık (Sürekli seyahat)</option>
      </select>
    </div>
  </div>
</div>

          {/* Test Sonucu Girişi */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              2. Test Sonucunuzu Girin
            </h3>
            <div className="space-y-4">
              <textarea
                value={testSonucu}
                onChange={(e) => setTestSonucu(e.target.value)}
                placeholder={
                  secilenTest === '16personalities' 
                    ? 'Örnek: ENFP-A veya INTJ-T gibi test sonucunuzu girin...'
                    : secilenTest === 'holland'
                    ? 'Örnek: RIA, ASE, ESI gibi 3 harfli kombinasyonunuzu girin...'
                    : secilenTest === 'disc'
                    ? 'Örnek: D: Yüksek, I: Orta, S: Düşük, C: Yüksek şeklinde sonuçlarınızı girin...'
                    : 'Test sonucunuzu buraya girin...'
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <p className="text-sm text-gray-500">
                💡 Test sonucunuzu olduğu gibi kopyalayıp yapıştırabilirsiniz
              </p>
            </div>
          </div>

          {/* Ek Bilgiler (Opsiyonel) */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              3. Ek Bilgiler (Opsiyonel)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yaş Aralığınız
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Seçiniz</option>
                  <option value="16-18">16-18 yaş</option>
                  <option value="19-22">19-22 yaş</option>
                  <option value="23-26">23-26 yaş</option>
                  <option value="27+">27+ yaş</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Eğitim Durumu
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Seçiniz</option>
                  <option value="lise">Lise</option>
                  <option value="universite">Üniversite</option>
                  <option value="mezun">Mezun</option>
                  <option value="calisan">Çalışan</option>
                </select>
              </div>
            </div>
          </div>

          {/* Analiz Butonu */}
          <div className="text-center">
            {analizediliyor ? (
              <div className="inline-flex items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                <span className="text-lg text-blue-600">AI Analizi Yapılıyor...</span>
              </div>
            ) : (
              <button
                onClick={analizBaslat}
                disabled={!secilenTest || !testSonucu}
                className={`px-8 py-4 rounded-lg font-semibold text-lg transition-colors ${
                  secilenTest && testSonucu
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                🤖 AI Analizi Başlat
              </button>
            )}
          </div>

        </div>

        {/* Yardım Kutusu */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-3">
            💡 Test Sonucunuzu Nasıl Bulursunuz?
          </h4>
          <div className="space-y-3 text-blue-800">
            <div>
              <h5 className="font-medium">16 Personalities:</h5>
              <p className="text-sm">Test bitiminde büyük harflerle görünen 4 harfli kod (örn: ENFP-A)</p>
            </div>
            <div>
              <h5 className="font-medium">Holland RIASEC:</h5>
              <p className="text-sm">En yüksek 3 puanı alan harfler (örn: R-I-A veya S-E-C)</p>
            </div>
            <div>
              <h5 className="font-medium">DISC:</h5>
              <p className="text-sm">Her boyut için yüzde değerleri veya yüksek/orta/düşük açıklamaları</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

// Analiz Sonucu Komponenti
function AnalizSonucu({ testTuru, sonuc }: { testTuru: string, sonuc: string }) {
  // Mock analiz sonucu
  const analizSonucu = {
    kisilikOzeti: "ENFP kişiliği olarak yaratıcı, sosyal ve ilham verici bir yapınız var. İnsanlarla çalışmayı seviyor ve yeni fikirler üretmekten keyif alıyorsunuz.",
    gucluYonler: [
      "Yaratıcı düşünce",
      "İnsanlarla iletişim",
      "Esneklik ve adaptasyon",
      "Motivasyon sağlama"
    ],
    gelisimAlanlari: [
      "Detaylara odaklanma",
      "Zaman yönetimi",
      "Sabır ve sebat",
      "Analitik düşünce"
    ],
    uygunMeslekler: [
      { isim: "Pazarlama Uzmanı", uygunluk: 94 },
      { isim: "İnsan Kaynakları", uygunluk: 91 },
      { isim: "Grafik Tasarımcı", uygunluk: 88 },
      { isim: "Proje Yöneticisi", uygunluk: 85 },
      { isim: "Öğretmen", uygunluk: 83 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/dashboard"
              className="text-blue-600 hover:text-blue-800"
            >
              ← Dashboard'a Dön
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              AI Kişilik Analizi Sonuçları
            </h1>
            <div className="flex space-x-2">
              <button className="text-green-600 hover:text-green-800">PDF İndir</button>
              <button className="text-blue-600 hover:text-blue-800">Paylaş</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Test Bilgisi */}         
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Analiz Tamamlandı! 🎉</h2>
          <p className="mb-1">Test Türü: <span className="font-semibold">{testTuru}</span></p>
          <p>Sonucunuz: <span className="font-semibold">{sonuc}</span></p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sol Kolon - Ana Analiz */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Kişilik Özeti */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🧠 Kişilik Özetiniz
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {analizSonucu.kisilikOzeti}
              </p>
            </div>

            {/* Güçlü Yönler */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                ⭐ Güçlü Yönleriniz
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analizSonucu.gucluYonler.map((guc, index) => (
                  <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-green-800 font-medium">{guc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gelişim Alanları */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                📈 Gelişim Alanları
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analizSonucu.gelisimAlanlari.map((alan, index) => (
                  <div key={index} className="flex items-center p-3 bg-orange-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span className="text-orange-800 font-medium">{alan}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sağ Kolon - Meslek Önerileri */}
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                🎯 Size Uygun Meslekler
              </h3>
              <div className="space-y-4">
                {analizSonucu.uygunMeslekler.map((meslek, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium text-gray-900">{meslek.isim}</h4>
                      <span className="text-lg font-bold text-blue-600">%{meslek.uygunluk}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${meslek.uygunluk}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sonraki Adımlar */}
            <div className="mt-6 bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                🚀 Sonraki Adımlar
              </h3>
              <div className="space-y-3">
                <Link
                  href="/career-discovery"
                  className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Meslek Detaylarını İncele
                </Link>
                <Link
                  href="/university-matcher"
                  className="block w-full bg-purple-600 text-white text-center py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Uygun Üniversiteleri Bul
                </Link>
                <Link
                  href="/chat"
                  className="block w-full bg-gray-600 text-white text-center py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
                >
                  AI Danışmanla Konuş
                </Link>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}