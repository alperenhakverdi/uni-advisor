'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Meslek {
  id: string;
  isim: string;
  kategori: string;
  tanim: string;
  ortalamaMaas: string;
  egitimSuresi: string;
  zorluSeviyesi: 'Kolay' | 'Orta' | 'Zor';
  buyumeOrani: string;
  temelBeceriler: string[];
  calismaOrtami: string;
  uygunKisilikler: string[];
  icon: string;
}

export default function MeslekKesfSayfasi() {
  const [secilenKategori, setSecilenKategori] = useState<string>('tumu');
  const [aramaMetni, setAramaMetni] = useState<string>('');

  const meslekler: Meslek[] = [
    {
      id: 'yazilim-gelistirici',
      isim: 'Yazılım Geliştirici',
      kategori: 'teknoloji',
      tanim: 'Web siteleri, mobil uygulamalar ve yazılım sistemleri geliştiren profesyonel',
      ortalamaMaas: '8.000 - 25.000 TL',
      egitimSuresi: '4 yıl üniversite',
      zorluSeviyesi: 'Orta',
      buyumeOrani: '%22 (Çok Hızlı)',
      temelBeceriler: ['Programlama', 'Problem Çözme', 'Algoritma', 'Veritabanı'],
      calismaOrtami: 'Ofis/Uzaktan çalışma',
      uygunKisilikler: ['INTJ', 'INTP', 'ISTJ'],
      icon: '💻'
    },
    {
      id: 'pazarlama-uzmani',
      isim: 'Pazarlama Uzmanı',
      kategori: 'is-yonetim',
      tanim: 'Ürün ve hizmetlerin tanıtımını yapan, müşteri kitlesine ulaşan profesyonel',
      ortalamaMaas: '6.000 - 18.000 TL',
      egitimSuresi: '4 yıl üniversite',
      zorluSeviyesi: 'Orta',
      buyumeOrani: '%8 (Hızlı)',
      temelBeceriler: ['İletişim', 'Yaratıcılık', 'Analiz', 'Dijital Pazarlama'],
      calismaOrtami: 'Ofis/Hibrit çalışma',
      uygunKisilikler: ['ENFP', 'ENTP', 'ESFP'],
      icon: '📈'
    },
    {
      id: 'doktor',
      isim: 'Doktor (Pratisyen Hekim)',
      kategori: 'saglik',
      tanim: 'Hastalıkları teşhis eden, tedavi eden ve sağlık hizmetleri sunan tıp uzmanı',
      ortalamaMaas: '12.000 - 40.000 TL',
      egitimSuresi: '6 yıl tıp + uzmanlık',
      zorluSeviyesi: 'Zor',
      buyumeOrani: '%4 (Orta)',
      temelBeceriler: ['Tıbbi Bilgi', 'Empati', 'Problem Çözme', 'Stres Yönetimi'],
      calismaOrtami: 'Hastane/Klinik',
      uygunKisilikler: ['ISFJ', 'INFJ', 'ISTJ'],
      icon: '👨‍⚕️'
    },
    {
      id: 'ogretmen',
      isim: 'Öğretmen',
      kategori: 'egitim',
      tanim: 'Öğrencilere bilgi ve beceri kazandıran, eğitim sürecini yöneten profesyonel',
      ortalamaMaas: '5.000 - 12.000 TL',
      egitimSuresi: '4 yıl üniversite',
      zorluSeviyesi: 'Orta',
      buyumeOrani: '%4 (Orta)',
      temelBeceriler: ['İletişim', 'Sabır', 'Organizasyon', 'Empati'],
      calismaOrtami: 'Okul/Sınıf ortamı',
      uygunKisilikler: ['ENFJ', 'ISFJ', 'ESFJ'],
      icon: '👨‍🏫'
    },
    {
      id: 'grafik-tasarimci',
      isim: 'Grafik Tasarımcı',
      kategori: 'sanat-tasarim',
      tanim: 'Görsel iletişim malzemeleri tasarlayan, marka kimliği oluşturan kreatif profesyonel',
      ortalamaMaas: '4.500 - 15.000 TL',
      egitimSuresi: '4 yıl üniversite',
      zorluSeviyesi: 'Orta',
      buyumeOrani: '%3 (Orta)',
      temelBeceriler: ['Yaratıcılık', 'Tasarım Programları', 'Estetik', 'İletişim'],
      calismaOrtami: 'Ajans/Freelance',
      uygunKisilikler: ['ISFP', 'INFP', 'ENFP'],
      icon: '🎨'
    },
    {
      id: 'muhendis-makine',
      isim: 'Makine Mühendisi',
      kategori: 'muhendislik',
      tanim: 'Mekanik sistemler tasarlayan, üretim süreçlerini optimize eden mühendis',
      ortalamaMaas: '7.000 - 20.000 TL',
      egitimSuresi: '4 yıl üniversite',
      zorluSeviyesi: 'Zor',
      buyumeOrani: '%7 (Hızlı)',
      temelBeceriler: ['Matematik', 'Fizik', 'CAD Yazılımları', 'Problem Çözme'],
      calismaOrtami: 'Fabrika/Ofis',
      uygunKisilikler: ['ISTJ', 'INTJ', 'ISTP'],
      icon: '⚙️'
    },
    {
      id: 'psikolog',
      isim: 'Psikolog',
      kategori: 'saglik',
      tanim: 'İnsan davranışlarını inceleyen, psikolojik destek ve terapi sağlayan uzman',
      ortalamaMaas: '6.000 - 18.000 TL',
      egitimSuresi: '4 yıl + yüksek lisans',
      zorluSeviyesi: 'Orta',
      buyumeOrani: '%3 (Orta)',
      temelBeceriler: ['Empati', 'Dinleme', 'Analiz', 'İletişim'],
      calismaOrtami: 'Klinik/Hastane',
      uygunKisilikler: ['INFJ', 'ENFJ', 'ISFJ'],
      icon: '🧠'
    },
    {
      id: 'avukat',
      isim: 'Avukat',
      kategori: 'hukuk',
      tanim: 'Hukuki süreçleri yöneten, müvekkillerini temsil eden hukuk uzmanı',
      ortalamaMaas: '8.000 - 30.000 TL',
      egitimSuresi: '4 yıl hukuk + staj',
      zorluSeviyesi: 'Zor',
      buyumeOrani: '%5 (Orta)',
      temelBeceriler: ['Hukuki Bilgi', 'İkna', 'Araştırma', 'İletişim'],
      calismaOrtami: 'Hukuk bürosu/Mahkeme',
      uygunKisilikler: ['ENTJ', 'ENTP', 'ESTJ'],
      icon: '⚖️'
    }
  ];

  const kategoriler = [
    { id: 'tumu', isim: 'Tümü', icon: '🔍' },
    { id: 'teknoloji', isim: 'Teknoloji', icon: '💻' },
    { id: 'muhendislik', isim: 'Mühendislik', icon: '⚙️' },
    { id: 'saglik', isim: 'Sağlık', icon: '🏥' },
    { id: 'egitim', isim: 'Eğitim', icon: '📚' },
    { id: 'is-yonetim', isim: 'İş & Yönetim', icon: '💼' },
    { id: 'sanat-tasarim', isim: 'Sanat & Tasarım', icon: '🎨' },
    { id: 'hukuk', isim: 'Hukuk', icon: '⚖️' }
  ];

  const filtrelenmisMeslekler = meslekler.filter(meslek => {
    const kategoriUygun = secilenKategori === 'tumu' || meslek.kategori === secilenKategori;
    const aramaUygun = meslek.isim.toLowerCase().includes(aramaMetni.toLowerCase()) ||
                       meslek.tanim.toLowerCase().includes(aramaMetni.toLowerCase());
    return kategoriUygun && aramaUygun;
  });

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
              Meslek Keşfi
            </h1>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800">Karşılaştır</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Başlık ve Arama */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            İdeal Mesleğinizi Keşfedin
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            AI destekli analiz ile size en uygun kariyer yollarını bulun
          </p>
          
          {/* Arama Kutusu */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Meslek ara..."
              value={aramaMetni}
              onChange={(e) => setAramaMetni(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Kategori Filtreleri */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {kategoriler.map((kategori) => (
              <button
                key={kategori.id}
                onClick={() => setSecilenKategori(kategori.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  secilenKategori === kategori.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {kategori.icon} {kategori.isim}
              </button>
            ))}
          </div>
        </div>

        {/* Meslek Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrelenmisMeslekler.map((meslek) => (
            <div key={meslek.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="p-6">
                
                {/* Başlık */}
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{meslek.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{meslek.isim}</h3>
                    <p className="text-sm text-gray-500 capitalize">{meslek.kategori.replace('-', ' & ')}</p>
                  </div>
                </div>

                {/* Açıklama */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {meslek.tanim}
                </p>

                {/* Önemli Bilgiler */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Maaş Aralığı:</span>
                    <span className="text-sm font-medium text-green-600">{meslek.ortalamaMaas}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Eğitim:</span>
                    <span className="text-sm font-medium">{meslek.egitimSuresi}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Zorluk:</span>
                    <span className={`text-sm font-medium ${
                      meslek.zorluSeviyesi === 'Kolay' ? 'text-green-600' :
                      meslek.zorluSeviyesi === 'Orta' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {meslek.zorluSeviyesi}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Büyüme:</span>
                    <span className="text-sm font-medium text-blue-600">{meslek.buyumeOrani}</span>
                  </div>
                </div>

                {/* Temel Beceriler */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Temel Beceriler:</p>
                  <div className="flex flex-wrap gap-1">
                    {meslek.temelBeceriler.slice(0, 3).map((beceri, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                        {beceri}
                      </span>
                    ))}
                    {meslek.temelBeceriler.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{meslek.temelBeceriler.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Uygun Kişilikler */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Uygun Kişilikler:</p>
                  <div className="flex space-x-1">
                    {meslek.uygunKisilikler.map((kisilik, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">
                        {kisilik}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Aksiyon Butonları */}
                <div className="flex space-x-2">
                  <Link
                    href={`/career/${meslek.id}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Detayları Gör
                  </Link>
                  <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    💾
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Sonuç Bulunamadı */}
        {filtrelenmisMeslekler.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Meslek bulunamadı
            </h3>
            <p className="text-gray-600">
              Arama kriterlerinizi değiştirmeyi deneyin
            </p>
          </div>
        )}

        {/* AI Önerileri */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            🤖 Size Özel Meslek Önerileri İster misiniz?
          </h3>
          <p className="mb-6">
            Kişilik testiniz ve ilgi alanlarınıza göre AI destekli özel öneriler alın
          </p>
          <div className="space-x-4">
            <Link 
              href="/assessment"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Kişilik Testi Al
            </Link>
            <Link 
              href="/chat"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
            >
              AI Danışmanla Konuş
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}