'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Meslek {
  id: string;
  slug: string;
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
  kisilikAciklamalari: Record<string, string>;
  icon: string;
  rozetler: string[];
  gunlukGorevler: string[];
  kariyerYolu: string[];
  avantajlar: string[];
  dezavantajlar: string[];
  meslekiGelisim: string[];
}

export default function MeslekKesfSayfasi() {
  const [secilenKategori, setSecilenKategori] = useState<string>('tumu');
  const [aramaMetni, setAramaMetni] = useState<string>('');
  const [karsilastirmaListesi, setKarsilastirmaListesi] = useState<string[]>([]);
  const [karsilastirmaPaneli, setKarsilastirmaPaneli] = useState<boolean>(false);
  const [hoveredMBTI, setHoveredMBTI] = useState<string | null>(null);

  const meslekler: Meslek[] = [
    {
      id: 'yazilim-gelistirici',
      slug: 'yazilim-gelistirici',
      isim: 'Yazılım Geliştirici',
      kategori: 'teknoloji',
      tanim: 'Web siteleri, mobil uygulamalar ve yazılım sistemleri geliştiren profesyonel',
      ortalamaMaas: '8.000 - 25.000 TL',
      egitimSuresi: '2-4 yıl (Bootcamp veya Üniversite)',
      zorluSeviyesi: 'Orta',
      buyumeOrani: 'Çok Yüksek (+%35)',
      temelBeceriler: ['JavaScript', 'Python', 'React', 'Problem Çözme'],
      calismaOrtami: 'Ofis/Uzaktan çalışma',
      uygunKisilikler: ['INTJ', 'INTP', 'ISTJ'],
      kisilikAciklamalari: {
        'INTJ': 'Stratejik düşünen, bağımsız çalışan tip',
        'INTP': 'Analitik, teorik yaklaşımı seven tip', 
        'ISTJ': 'Detaylı, sistematik çalışan tip'
      },
      icon: '💻',
      rozetler: ['Yüksek Maaş', 'Uzaktan Çalışma', 'Hızlı Büyüme'],
      gunlukGorevler: [
        'Kod yazma ve geliştirme',
        'Problem çözme ve debugging',
        'Takım toplantıları',
        'Yeni teknolojileri öğrenme'
      ],
      kariyerYolu: [
        'Junior Developer → Senior Developer → Tech Lead → Architect',
        'Alternatif: Product Manager, DevOps, Freelance'
      ],
      avantajlar: [
        'Yüksek maaş potansiyeli',
        'Uzaktan çalışma imkanı',
        'Sürekli öğrenme ve gelişim',
        'Global iş imkanları'
      ],
      dezavantajlar: [
        'Sürekli teknoloji değişimi',
        'Uzun oturma süreleri',
        'Yoğun konsantrasyon gereksinimi',
        'Başlangıçta zorlu öğrenme süreci'
      ],
      meslekiGelisim: [
        'Online kurslar (Udemy, Coursera)',
        'GitHub projeleri',
        'Open source katkıları',
        'Tech meetup\'lara katılım'
      ]
    },
    {
      id: 'ux-ui-tasarimci',
      slug: 'ux-ui-tasarimci', 
      isim: 'UX/UI Tasarımcı',
      kategori: 'sanat-tasarim',
      tanim: 'Kullanıcı deneyimi ve arayüz tasarımı yapan yaratıcı profesyonel',
      ortalamaMaas: '6.000 - 18.000 TL',
      egitimSuresi: '6 ay - 3 yıl (Sertifika veya Lisans)',
      zorluSeviyesi: 'Orta',
      buyumeOrani: 'Yüksek (+%25)',
      temelBeceriler: ['Figma', 'Prototyping', 'User Research', 'Yaratıcılık'],
      calismaOrtami: 'Ajans/Şirket/Freelance',
      uygunKisilikler: ['ISFP', 'INFP', 'ENFP'],
      kisilikAciklamalari: {
        'ISFP': 'Yaratıcı, estetik odaklı, uyumlu tip',
        'INFP': 'İdealist, kullanıcı empati kurabilen tip',
        'ENFP': 'Sosyal, yenilikçi, etkileşim seven tip'
      },
      icon: '🎨',
      rozetler: ['Yaratıcı', 'Hibrit Çalışma', 'Freelance Uygun'],
      gunlukGorevler: [
        'Kullanıcı araştırması yapma',
        'Tasarım prototipleri oluşturma',
        'Müşteri sunumları',
        'A/B test analizi'
      ],
      kariyerYolu: [
        'Junior UX → Senior UX → Lead Designer → Design Director',
        'Alternatif: Product Designer, Service Designer, Freelance'
      ],
      avantajlar: [
        'Yaratıcı ifade özgürlüğü',
        'Kullanıcılara doğrudan etki',
        'Çeşitli proje türleri',
        'Freelance fırsatları'
      ],
      dezavantajlar: [
        'Sübjektif geri bildirimler',
        'Müşteri beklentileri yönetimi',
        'Trend değişimlerine uyum',
        'Başlangıçta portföy oluşturma zorluğu'
      ],
      meslekiGelisim: [
        'Dribbble, Behance portfolyo',
        'Design thinking workshop\'ları',
        'UX research kurları',
        'Design community\'lere katılım'
      ]
    },
    {
      id: 'veri-analisti',
      slug: 'veri-analisti',
      isim: 'Veri Analisti',
      kategori: 'teknoloji',
      tanim: 'Büyük veri kümelerini analiz ederek iş kararlarına yön veren uzman',
      ortalamaMaas: '7.000 - 20.000 TL',
      egitimSuresi: '1-3 yıl (Bootcamp veya Lisans)',
      zorluSeviyesi: 'Orta',
      buyumeOrani: 'Çok Yüksek (+%40)',
      temelBeceriler: ['Python', 'SQL', 'Excel', 'İstatistik'],
      calismaOrtami: 'Ofis/Hibrit çalışma',
      uygunKisilikler: ['INTJ', 'ISTJ', 'INTP'],
      kisilikAciklamalari: {
        'INTJ': 'Stratejik, büyük resim gören tip',
        'ISTJ': 'Metodical, detay odaklı tip',
        'INTP': 'Analitik, veri sevgisi olan tip'
      },
      icon: '📊',
      rozetler: ['AI Boom', 'Yüksek Talep', 'Geleceğin Mesleği'],
      gunlukGorevler: [
        'Veri toplama ve temizleme',
        'Analiz ve görselleştirme',
        'Rapor hazırlama',
        'Stakeholder sunumları'
      ],
      kariyerYolu: [
        'Junior Analyst → Senior Analyst → Lead Analyst → Data Scientist',
        'Alternatif: Business Intelligence, Machine Learning Engineer'
      ],
      avantajlar: [
        'Yüksek talep',
        'İyi maaş artışı',
        'Uzaktan çalışma uygun',
        'Farklı sektörlerde çalışma'
      ],
      dezavantajlar: [
        'Sürekli öğrenme gereksinimi',
        'Veri kalitesi sorunları',
        'Teknik detaylara takılma riski',
        'Uzun analiz süreçleri'
      ],
      meslekiGelisim: [
        'Kaggle yarışmaları',
        'Data science bootcamp\'ları',
        'SQL ve Python kurları',
        'Industry reports takibi'
      ]
    },
    {
      id: 'dijital-pazarlama',
      slug: 'dijital-pazarlama-uzmani',
      isim: 'Dijital Pazarlama Uzmanı',
      kategori: 'is-yonetim',
      tanim: 'Online platformlarda marka tanıtımı ve satış stratejileri yöneten uzman',
      ortalamaMaas: '5.000 - 15.000 TL',
      egitimSuresi: '6 ay - 2 yıl (Sertifika programları)',
      zorluSeviyesi: 'Kolay',
      buyumeOrani: 'Yüksek (+%20)',
      temelBeceriler: ['Google Ads', 'Social Media', 'Content', 'Analytics'],
      calismaOrtami: 'Ajans/Şirket/Freelance',
      uygunKisilikler: ['ENFP', 'ESFP', 'ENTP'],
      kisilikAciklamalari: {
        'ENFP': 'Sosyal, yaratıcı, trend takip eden tip',
        'ESFP': 'Etkileşim seven, esnek tip',
        'ENTP': 'Yenilikçi, çoklu proje yöneten tip'
      },
      icon: '📈',
      rozetler: ['Kolay Giriş', 'Yaratıcı', 'Sosyal Medya'],
      gunlukGorevler: [
        'Campaign yönetimi',
        'Content üretimi',
        'Performance analizi',
        'Müşteri iletişimi'
      ],
      kariyerYolu: [
        'Specialist → Senior Specialist → Manager → Director',
        'Alternatif: Brand Manager, Growth Hacker, Agency Owner'
      ],
      avantajlar: [
        'Kolay başlangıç',
        'Yaratıcı özgürlük', 
        'Trend takibi',
        'Freelance fırsatları'
      ],
      dezavantajlar: [
        'Platform değişimleri',
        'Sürekli güncel kalma',
        'ROI baskısı',
        'Weekend çalışma olasılığı'
      ],
      meslekiGelisim: [
        'Google/Facebook sertifikaları',
        'Marketing automation kurları',
        'A/B testing workshop\'ları',
        'Industry blog takibi'
      ]
    },
    {
      id: 'doktor',
      slug: 'doktor-pratisyen',
      isim: 'Doktor (Pratisyen)',
      kategori: 'saglik',
      tanim: 'Hastalık teşhisi, tedavi ve sağlık hizmetleri sunan tıp uzmanı',
      ortalamaMaas: '12.000 - 40.000 TL',
      egitimSuresi: '6 yıl Tıp + 3-5 yıl Uzmanlık',
      zorluSeviyesi: 'Zor',
      buyumeOrani: 'Orta (+%8)',
      temelBeceriler: ['Tıbbi Bilgi', 'Empati', 'Problem Çözme', 'İletişim'],
      calismaOrtami: 'Hastane/Klinik/Muayenehane',
      uygunKisilikler: ['ISFJ', 'INFJ', 'ESFJ'],
      kisilikAciklamalari: {
        'ISFJ': 'Yardımsever, detaylı, hasta odaklı tip',
        'INFJ': 'Empatik, derin anlayış sahibi tip',
        'ESFJ': 'Sosyal, organize, hizmet odaklı tip'
      },
      icon: '👨‍⚕️',
      rozetler: ['Prestijli', 'Topluma Hizmet', 'İş Güvencesi'],
      gunlukGorevler: [
        'Hasta muayenesi',
        'Teşhis ve tedavi',
        'Tıbbi kayıt tutma',
        'Mesleki gelişim'
      ],
      kariyerYolu: [
        'Tıp Öğrencisi → Pratisyen → Uzman → Akademisyen/Başhekim',
        'Alternatif: Özel muayenehane, Tıbbi araştırmacı'
      ],
      avantajlar: [
        'Yüksek prestij',
        'İş güvencesi',
        'Topluma değerli katkı',
        'Sürekli öğrenme'
      ],
      dezavantajlar: [
        'Uzun eğitim süreci',
        'Yoğun çalışma saatleri',
        'Yüksek sorumluluk',
        'Emotional burnout riski'
      ],
      meslekiGelisim: [
        'Uzmanlık eğitimleri',
        'Tıbbi kongreler',
        'Araştırma projeleri',
        'Yurtdışı fellowship\'ları'
      ]
    },
    {
      id: 'ogretmen',
      slug: 'ogretmen',
      isim: 'Öğretmen',
      kategori: 'egitim',
      tanim: 'Öğrencilere bilgi ve beceri kazandıran, eğitim sürecini yöneten profesyonel',
      ortalamaMaas: '5.000 - 12.000 TL',
      egitimSuresi: '4 yıl Eğitim Fakültesi',
      zorluSeviyesi: 'Orta',
      buyumeOrani: 'Düşük (+%4)',
      temelBeceriler: ['İletişim', 'Sabır', 'Organizasyon', 'Empati'],
      calismaOrtami: 'Okul/Eğitim kurumu',
      uygunKisilikler: ['ENFJ', 'ISFJ', 'ESFJ'],
      kisilikAciklamalari: {
        'ENFJ': 'İlham verici, öğrenci gelişimi odaklı tip',
        'ISFJ': 'Destekleyici, sabırlı, titiz tip',
        'ESFJ': 'Sosyal, organize, grup yönetimi iyi tip'
      },
      icon: '👨‍🏫',
      rozetler: ['İş Güvencesi', 'Tatil Fazla', 'Topluma Hizmet'],
      gunlukGorevler: [
        'Ders planlama ve anlatım',
        'Öğrenci değerlendirme',
        'Veli görüşmeleri',
        'Kişisel gelişim'
      ],
      kariyerYolu: [
        'Öğretmen → Başöğretmen → Müdür Yardımcısı → Müdür',
        'Alternatif: Özel ders, Online eğitim, Eğitim danışmanlığı'
      ],
      avantajlar: [
        'İş güvencesi',
        'Uzun tatiller',
        'Geleceği şekillendirme',
        'Sosyal statü'
      ],
      dezavantajlar: [
        'Düşük maaş artışı',
        'Sınıf yönetimi zorlukları',
        'Bürokrasi',
        'Öğrenci/veli sorunları'
      ],
      meslekiGelisim: [
        'Pedagoji kursları',
        'Teknoloji entegrasyonu',
        'Sınıf yönetimi teknikleri',
        'Alan uzmanlığı sertifikaları'
      ]
    }
  ];

  const kategoriler = [
    { id: 'tumu', isim: 'Tümü', icon: '🔍' },
    { id: 'teknoloji', isim: 'Teknoloji', icon: '💻' },
    { id: 'sanat-tasarim', isim: 'Sanat & Tasarım', icon: '🎨' },
    { id: 'is-yonetim', isim: 'İş & Yönetim', icon: '💼' },
    { id: 'saglik', isim: 'Sağlık', icon: '🏥' },
    { id: 'egitim', isim: 'Eğitim', icon: '📚' }
  ];

  const mbtiAciklamalari: Record<string, string> = {
    'INTJ': 'Stratejik düşünen, bağımsız çalışan tip',
    'INTP': 'Analitik, teorik yaklaşımı seven tip',
    'ISTJ': 'Detaylı, sistematik çalışan tip',
    'ISFP': 'Yaratıcı, estetik odaklı, uyumlu tip',
    'INFP': 'İdealist, kullanıcı empati kurabilen tip',
    'ENFP': 'Sosyal, yenilikçi, etkileşim seven tip',
    'ESFP': 'Etkileşim seven, esnek tip',
    'ENTP': 'Yenilikçi, çoklu proje yöneten tip',
    'ISFJ': 'Yardımsever, detaylı, hasta odaklı tip',
    'INFJ': 'Empatik, derin anlayış sahibi tip',
    'ESFJ': 'Sosyal, organize, hizmet odaklı tip',
    'ENFJ': 'İlham verici, öğrenci gelişimi odaklı tip'
  };

  const filtrelenmisMeslekler = meslekler.filter(meslek => {
    const kategoriUygun = secilenKategori === 'tumu' || meslek.kategori === secilenKategori;
    const aramaUygun = meslek.isim.toLowerCase().includes(aramaMetni.toLowerCase()) ||
                       meslek.tanim.toLowerCase().includes(aramaMetni.toLowerCase()) ||
                       meslek.temelBeceriler.some(beceri => 
                         beceri.toLowerCase().includes(aramaMetni.toLowerCase())) ||
                       meslek.rozetler.some(rozet => 
                         rozet.toLowerCase().includes(aramaMetni.toLowerCase()));
    return kategoriUygun && aramaUygun;
  });

  const karsilastirmaToggle = (meslekId: string) => {
    setKarsilastirmaListesi(prev => {
      const mevcutmu = prev.includes(meslekId);
      let yeniListe;
      
      if (mevcutmu) {
        yeniListe = prev.filter(id => id !== meslekId);
      } else if (prev.length < 3) {
        yeniListe = [...prev, meslekId];
      } else {
        alert('En fazla 3 meslek karşılaştırabilirsiniz.');
        return prev;
      }
      
      setKarsilastirmaPaneli(yeniListe.length >= 2);
      return yeniListe;
    });
  };

  const karsilastirmaliMeslekler = meslekler.filter(meslek => 
    karsilastirmaListesi.includes(meslek.id)
  );

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
              {karsilastirmaListesi.length >= 2 && (
                <button 
                  onClick={() => setKarsilastirmaPaneli(!karsilastirmaPaneli)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Karşılaştır ({karsilastirmaListesi.length})
                </button>
              )}
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
          
          {/* Gelişmiş Arama Kutusu */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Meslek, beceri veya özellik ara..."
              value={aramaMetni}
              onChange={(e) => setAramaMetni(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <div className="absolute right-3 top-3 text-gray-400">🔍</div>
            {aramaMetni && (
              <div className="absolute right-10 top-3">
                <button
                  onClick={() => setAramaMetni('')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          
          {aramaMetni && (
            <p className="mt-2 text-sm text-gray-500">
              "{aramaMetni}" için {filtrelenmisMeslekler.length} sonuç bulundu
            </p>
          )}
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
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {kategori.icon} {kategori.isim}
              </button>
            ))}
          </div>
        </div>

        {/* Karşılaştırma Paneli */}
        {karsilastirmaPaneli && (
          <div className="mb-8 bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                🔍 Meslek Karşılaştırması
              </h3>
              <button
                onClick={() => setKarsilastirmaPaneli(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {karsilastirmaliMeslekler.map((meslek) => (
                <div key={meslek.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{meslek.isim}</h4>
                    <button
                      onClick={() => karsilastirmaToggle(meslek.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Kaldır
                    </button>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>💰 <span className="font-medium">Maaş:</span> {meslek.ortalamaMaas}</div>
                    <div>📚 <span className="font-medium">Eğitim:</span> {meslek.egitimSuresi}</div>
                    <div>⚡ <span className="font-medium">Zorluk:</span> {meslek.zorluSeviyesi}</div>
                    <div>📈 <span className="font-medium">Büyüme:</span> {meslek.buyumeOrani}</div>
                  </div>
                  <div className="mt-2">
                    <Link
                      href={`/career/${meslek.slug}`}
                      className="text-blue-600 hover:text-blue-800 text-sm underline"
                    >
                      Detayları Gör →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Meslek Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrelenmisMeslekler.map((meslek) => (
            <div key={meslek.id} className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 relative">
              
              {/* Karşılaştırma Checkbox */}
              <div className="absolute top-4 right-4 z-10">
                <input
                  type="checkbox"
                  checked={karsilastirmaListesi.includes(meslek.id)}
                  onChange={() => karsilastirmaToggle(meslek.id)}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                  title="Karşılaştırmaya ekle"
                />
              </div>

              <div className="p-6">
                
                {/* Başlık ve Rozetler */}
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{meslek.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{meslek.isim}</h3>
                    <p className="text-sm text-gray-500 capitalize">
                      {meslek.kategori.replace('-', ' & ')}
                    </p>
                  </div>
                </div>

                {/* Rozetler */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {meslek.rozetler.map((rozet, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        rozet.includes('Yüksek') || rozet.includes('Hızlı') ? 'bg-green-100 text-green-800' :
                        rozet.includes('Yaratıcı') || rozet.includes('Freelance') ? 'bg-purple-100 text-purple-800' :
                        rozet.includes('Prestij') || rozet.includes('Güvenlik') ? 'bg-blue-100 text-blue-800' :
                        rozet.includes('Kolay') ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {rozet}
                    </span>
                  ))}
                </div>

                {/* Açıklama */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {meslek.tanim}
                </p>

                {/* Önemli Bilgiler */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">💰 Maaş Aralığı:</span>
                    <span className="text-sm font-medium text-green-600">{meslek.ortalamaMaas}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">📚 Eğitim:</span>
                    <span className="text-sm font-medium">{meslek.egitimSuresi}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">⚡ Zorluk:</span>
                    <span className={`text-sm font-medium ${
                      meslek.zorluSeviyesi === 'Kolay' ? 'text-green-600' :
                      meslek.zorluSeviyesi === 'Orta' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {meslek.zorluSeviyesi}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">📈 Büyüme:</span>
                    <span className="text-sm font-medium text-blue-600">{meslek.buyumeOrani}</span>
                  </div>
                </div>

                {/* Temel Beceriler */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">🔧 Temel Beceriler:</p>
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

                {/* Uygun Kişilikler - Hover Açıklamalı */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">🧠 Uygun Kişilikler:</p>
                  <div className="flex space-x-1">
                    {meslek.uygunKisilikler.map((kisilik, index) => (
                      <div key={index} className="relative">
                        <span 
                          className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded cursor-help"
                          onMouseEnter={() => setHoveredMBTI(kisilik)}
                          onMouseLeave={() => setHoveredMBTI(null)}
                        >
                          {kisilik}
                        </span>
                        {hoveredMBTI === kisilik && (
                          <div className="absolute bottom-full left-0 mb-2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-20 w-48">
                            {meslek.kisilikAciklamalari[kisilik] || mbtiAciklamalari[kisilik] || 'Açıklama bulunamadı'}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Aksiyon Butonları */}
                <div className="flex space-x-2">
                  <Link
                    href={`/career/${meslek.slug}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    🔍 Detayları Gör
                  </Link>
                  <button 
                    onClick={() => karsilastirmaToggle(meslek.id)}
                    className={`px-3 py-2 rounded-md transition-colors text-sm ${
                      karsilastirmaListesi.includes(meslek.id)
                        ? 'bg-purple-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                    title="Karşılaştırmaya ekle/çıkar"
                  >
                    {karsilastirmaListesi.includes(meslek.id) ? '✓' : '⚖️'}
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
            <p className="text-gray-600 mb-4">
              "{aramaMetni}" için sonuç bulunamadı. Arama kriterlerinizi değiştirmeyi deneyin.
            </p>
            <button
              onClick={() => {
                setAramaMetni('');
                setSecilenKategori('tumu');
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}

        {/* AI Önerileri CTA */}
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
              🧠 Kişilik Testi Al
            </Link>
            <Link 
              href="/chat"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
            >
              💬 AI Danışmanla Konuş
            </Link>
          </div>
        </div>

        {/* İstatistikler */}
        {aramaMetni === '' && secilenKategori === 'tumu' && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              📊 Meslek İstatistikleri
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{meslekler.length}</div>
                <div className="text-sm text-gray-600">Toplam Meslek</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {meslekler.filter(m => m.rozetler.some(r => r.includes('Yüksek'))).length}
                </div>
                <div className="text-sm text-gray-600">Yüksek Büyüme</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {meslekler.filter(m => m.rozetler.some(r => r.includes('Freelance'))).length}
                </div>
                <div className="text-sm text-gray-600">Freelance Uygun</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {meslekler.filter(m => m.zorluSeviyesi === 'Kolay').length}
                </div>
                <div className="text-sm text-gray-600">Kolay Giriş</div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}