'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Beceri {
  id: string;
  isim: string;
  kategori: string;
  seviye: 'Başlangıç' | 'Orta' | 'İleri';
  sure: string;
  aciklama: string;
  gerekliOlduguMeslekler: string[];
  kaynaklar: {
    tip: 'Video' | 'Kurs' | 'Kitap' | 'Proje';
    baslik: string;
    link: string;
    ucretsiz: boolean;
  }[];
  oncelik: 'Yüksek' | 'Orta' | 'Düşük';
}

export default function BeceriGelistirmeSayfasi() {
  const [secilenMeslek, setSecilenMeslek] = useState<string>('');
  const [mevcutBeceriler, setMevcutBeceriler] = useState<string[]>([]);
  const [analizTamamlandi, setAnalizTamamlandi] = useState(false);

  const meslekler = [
    'Yazılım Geliştirici',
    'Veri Analisti', 
    'Dijital Pazarlama Uzmanı',
    'Grafik Tasarımcı',
    'Proje Yöneticisi',
    'İnsan Kaynakları Uzmanı',
    'İçerik Editörü',
    'UI/UX Tasarımcı'
  ];

  const tumBeceriler = [
    'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git',
    'Photoshop', 'Illustrator', 'Figma', 'Adobe XD',
    'Google Analytics', 'SEO', 'Social Media', 'Content Writing',
    'Excel', 'PowerPoint', 'Project Management', 'Agile',
    'İletişim', 'Sunum', 'Liderlik', 'Problem Çözme'
  ];

  const ornekBeceriProgrami: Beceri[] = [
    {
      id: 'javascript',
      isim: 'JavaScript Programlama',
      kategori: 'Teknik',
      seviye: 'Başlangıç',
      sure: '6-8 hafta',
      aciklama: 'Web geliştirme için temel programlama dili. Frontend ve backend geliştirmede kullanılır.',
      gerekliOlduguMeslekler: ['Yazılım Geliştirici', 'Frontend Developer', 'Full-Stack Developer'],
      kaynaklar: [
        { tip: 'Kurs', baslik: 'JavaScript Temelleri', link: 'https://codecademy.com/javascript', ucretsiz: false },
        { tip: 'Video', baslik: 'JavaScript Crash Course', link: 'https://youtube.com/watch?v=hdI2bqOjy3c', ucretsiz: true },
        { tip: 'Kitap', baslik: 'Eloquent JavaScript', link: 'https://eloquentjavascript.net/', ucretsiz: true }
      ],
      oncelik: 'Yüksek'
    },
    {
      id: 'data-analysis',
      isim: 'Veri Analizi (Excel + Python)',
      kategori: 'Teknik',
      seviye: 'Orta',
      sure: '8-10 hafta',
      aciklama: 'Büyük veri setlerini analiz etme, görselleştirme ve raporlama becerileri.',
      gerekliOlduguMeslekler: ['Veri Analisti', 'Business Analyst', 'Pazarlama Uzmanı'],
      kaynaklar: [
        { tip: 'Kurs', baslik: 'Python for Data Science', link: 'https://coursera.org/python-data', ucretsiz: false },
        { tip: 'Video', baslik: 'Excel İleri Seviye', link: 'https://youtube.com/excel', ucretsiz: true },
        { tip: 'Proje', baslik: 'Kaggle Veri Seti Analizi', link: 'https://kaggle.com/datasets', ucretsiz: true }
      ],
      oncelik: 'Yüksek'
    },
    {
      id: 'digital-marketing',
      isim: 'Dijital Pazarlama',
      kategori: 'Pazarlama',
      seviye: 'Başlangıç',
      sure: '4-6 hafta',
      aciklama: 'SEO, SEM, sosyal medya pazarlama ve Google Analytics kullanımı.',
      gerekliOlduguMeslekler: ['Dijital Pazarlama Uzmanı', 'İçerik Pazarlama', 'E-ticaret Uzmanı'],
      kaynaklar: [
        { tip: 'Kurs', baslik: 'Google Digital Marketing', link: 'https://learndigital.withgoogle.com', ucretsiz: true },
        { tip: 'Kurs', baslik: 'Facebook Blueprint', link: 'https://facebook.com/blueprint', ucretsiz: true },
        { tip: 'Video', baslik: 'SEO Rehberi', link: 'https://youtube.com/seo', ucretsiz: true }
      ],
      oncelik: 'Orta'
    },
    {
      id: 'ui-ux-design',
      isim: 'UI/UX Tasarım',
      kategori: 'Tasarım',
      seviye: 'Orta',
      sure: '10-12 hafta',
      aciklama: 'Kullanıcı deneyimi tasarımı, prototipleme ve tasarım araçları kullanımı.',
      gerekliOlduguMeslekler: ['UI/UX Tasarımcı', 'Ürün Tasarımcısı', 'Web Tasarımcı'],
      kaynaklar: [
        { tip: 'Kurs', baslik: 'Google UX Design Certificate', link: 'https://coursera.org/google-ux', ucretsiz: false },
        { tip: 'Video', baslik: 'Figma Tutorials', link: 'https://youtube.com/figma', ucretsiz: true },
        { tip: 'Proje', baslik: 'Daily UI Challenge', link: 'https://dailyui.co', ucretsiz: true }
      ],
      oncelik: 'Orta'
    },
    {
      id: 'project-management',
      isim: 'Proje Yönetimi',
      kategori: 'Yönetim',
      seviye: 'Orta',
      sure: '6-8 hafta',
      aciklama: 'Agile, Scrum metodolojileri ve proje yönetim araçları kullanımı.',
      gerekliOlduguMeslekler: ['Proje Yöneticisi', 'Scrum Master', 'Ürün Müdürü'],
      kaynaklar: [
        { tip: 'Kurs', baslik: 'PMP Certification Prep', link: 'https://pmi.org', ucretsiz: false },
        { tip: 'Kurs', baslik: 'Agile with Atlassian Jira', link: 'https://coursera.org/agile', ucretsiz: false },
        { tip: 'Video', baslik: 'Scrum Fundamentals', link: 'https://youtube.com/scrum', ucretsiz: true }
      ],
      oncelik: 'Düşük'
    }
  ];

  const beceriSecimToggle = (beceri: string) => {
    setMevcutBeceriler(prev => 
      prev.includes(beceri) 
        ? prev.filter(b => b !== beceri)
        : [...prev, beceri]
    );
  };

  const analizBaslat = () => {
    if (!secilenMeslek) {
      alert('Lütfen hedef mesleğinizi seçin.');
      return;
    }
    setAnalizTamamlandi(true);
  };

  if (analizTamamlandi) {
    return <BeceriGelistirmePlani meslekAdi={secilenMeslek} mevcutBeceriler={mevcutBeceriler} beceriProgrami={ornekBeceriProgrami} onGeriDon={() => setAnalizTamamlandi(false)} />;
  }

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
              Beceri Geliştirme Planlayıcısı
            </h1>
            <div></div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Başlık */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Kişiselleştirilmiş Beceri Geliştirme Planı
          </h2>
          <p className="text-lg text-gray-600">
            Hedef mesleğinize göre eksik becerilerinizi belirleyin ve öğrenme yolunuzu çizin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sol Kolon - Profil Oluşturma */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Hedef Meslek */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">1. Hedef Mesleğiniz</h3>
              <select 
                value={secilenMeslek}
                onChange={(e) => setSecilenMeslek(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              >
                <option value="">Mesleğinizi seçin...</option>
                {meslekler.map(meslek => (
                  <option key={meslek} value={meslek}>{meslek}</option>
                ))}
              </select>
            </div>

            {/* Mevcut Beceriler */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">2. Mevcut Becerileriniz</h3>
              <p className="text-sm text-gray-600 mb-4">Halihazırda sahip olduğunuz becerileri seçin:</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {tumBeceriler.map(beceri => (
                  <button
                    key={beceri}
                    onClick={() => beceriSecimToggle(beceri)}
                    className={`p-3 text-left rounded-lg border transition-colors ${
                      mevcutBeceriler.includes(beceri)
                        ? 'bg-green-50 border-green-500 text-green-900'
                        : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded border-2 mr-2 ${
                        mevcutBeceriler.includes(beceri)
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-400'
                      }`}>
                        {mevcutBeceriler.includes(beceri) && (
                          <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium">{beceri}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  Seçilen beceriler: {mevcutBeceriler.length} / {tumBeceriler.length}
                </p>
              </div>
            </div>

            {/* Öğrenme Tercihleri */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">3. Öğrenme Tercihleriniz</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Haftalık Çalışma Süresi
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>5-10 saat</option>
                    <option>10-20 saat</option>
                    <option>20+ saat</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Öğrenme Tarzı
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Video tabanlı</option>
                    <option>Metin tabanlı</option>
                    <option>Proje tabanlı</option>
                    <option>Karma</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bütçe Durumu
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Sadece ücretsiz</option>
                    <option>Düşük bütçe (0-500₺/ay)</option>
                    <option>Orta bütçe (500-1500₺/ay)</option>
                    <option>Yüksek bütçe (1500₺+/ay)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hedef Süre
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>3 ay içinde</option>
                    <option>6 ay içinde</option>
                    <option>1 yıl içinde</option>
                    <option>Zaman sınırı yok</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          {/* Sağ Kolon - Bilgilendirme */}
          <div className="space-y-6">
            
            {/* Analiz Butonu */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Analizi</h3>
              <p className="text-gray-600 text-sm mb-4">
                Seçimlerinize göre kişiselleştirilmiş beceri geliştirme planınızı oluşturacağız
              </p>
              <button
                onClick={analizBaslat}
                disabled={!secilenMeslek}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  secilenMeslek
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                🚀 Beceri Planımı Oluştur
              </button>
            </div>

            {/* Popüler Beceriler */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🔥 Popüler Beceriler 2024</h3>
              <div className="space-y-3">
                {[
                  { beceri: 'Yapay Zeka', trend: '+45%' },
                  { beceri: 'Veri Analizi', trend: '+38%' },
                  { beceri: 'Dijital Pazarlama', trend: '+32%' },
                  { beceri: 'UI/UX Tasarım', trend: '+28%' },
                  { beceri: 'Proje Yönetimi', trend: '+25%' }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{item.beceri}</span>
                    <span className="text-sm text-green-600 font-semibold">{item.trend}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* İstatistikler */}
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">📊 Platform İstatistikleri</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Aktif Öğrenci</span>
                  <span className="font-bold">12,847</span>
                </div>
                <div className="flex justify-between">
                  <span>Tamamlanan Kurs</span>
                  <span className="font-bold">5,632</span>
                </div>
                <div className="flex justify-between">
                  <span>Başarı Oranı</span>
                  <span className="font-bold">%87</span>
                </div>
              </div>
            </div>

            {/* İpuçları */}
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">💡 İpuçları</h3>
              <div className="space-y-2 text-sm text-yellow-800">
                <p>• Mevcut becerilerinizi dürüstçe değerlendirin</p>
                <p>• Hedef mesleğe özel becerilere odaklanın</p>
                <p>• Küçük adımlarla başlayın, tutarlı olun</p>
                <p>• Pratik projelerde becerilerinizi uygulayın</p>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}

// Beceri Geliştirme Planı Komponenti
function BeceriGelistirmePlani({ meslekAdi, mevcutBeceriler, beceriProgrami, onGeriDon }: any) {
  const [secilenBeceri, setSecilenBeceri] = useState<string | null>(null);

  const eksikBeceriler = beceriProgrami.filter((beceri: Beceri) => 
    beceri.gerekliOlduguMeslekler.includes(meslekAdi) &&
    !mevcutBeceriler.some((mevcut: string) => mevcut.toLowerCase().includes(beceri.isim.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={onGeriDon}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Geri Dön
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              {meslekAdi} - Beceri Geliştirme Planı
            </h1>
            <div className="flex space-x-2">
              <button className="text-green-600 hover:text-green-800">PDF İndir</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Özet */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Kişiselleştirilmiş Öğrenme Planınız Hazır! 🎯</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <div className="text-2xl font-bold">{eksikBeceriler.length}</div>
              <div className="text-blue-100">Öğrenilecek Beceri</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{mevcutBeceriler.length}</div>
              <div className="text-blue-100">Mevcut Beceri</div>
            </div>
            <div>
              <div className="text-2xl font-bold">12-16</div>
              <div className="text-blue-100">Hafta (Tahmini)</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sol Kolon - Beceri Listesi */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              🎯 {meslekAdi} İçin Önerilen Beceriler
            </h3>
            
            <div className="space-y-4">
              {eksikBeceriler.map((beceri: Beceri, index: number) => (
                <div key={beceri.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-bold mr-3 ${
                          beceri.oncelik === 'Yüksek' ? 'bg-red-500' : beceri.oncelik === 'Orta' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}>
                          {index + 1}
                        </span>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{beceri.isim}</h4>
                          <p className="text-sm text-gray-600">{beceri.kategori} • {beceri.seviye} • {beceri.sure}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        beceri.oncelik === 'Yüksek' ? 'bg-red-100 text-red-800' :
                        beceri.oncelik === 'Orta' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {beceri.oncelik} Öncelik
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4">{beceri.aciklama}</p>

                    {/* Kaynaklar */}
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Önerilen Kaynaklar:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {beceri.kaynaklar.slice(0, 2).map((kaynak, idx) => (
                          <div key={idx} className="flex items-center p-2 bg-gray-50 rounded">
                            <span className="text-xs mr-2">
                              {kaynak.tip === 'Video' ? '📹' : 
                               kaynak.tip === 'Kurs' ? '🎓' : 
                               kaynak.tip === 'Kitap' ? '📚' : '🛠️'}
                            </span>
                            <div className="flex-1">
                              <div className="text-sm font-medium">{kaynak.baslik}</div>
                              <div className="flex items-center">
                                <span className="text-xs text-gray-500">{kaynak.tip}</span>
                                {kaynak.ucretsiz && (
                                  <span className="ml-2 px-1 py-0.5 bg-green-100 text-green-800 text-xs rounded">Ücretsiz</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Gerekli Meslekler: {beceri.gerekliOlduguMeslekler.slice(0, 2).join(', ')}
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setSecilenBeceri(secilenBeceri === beceri.id ? null : beceri.id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          {secilenBeceri === beceri.id ? 'Kapat' : 'Detaylar'}
                        </button>
                        <button className="border border-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-50">
                          Planıma Ekle
                        </button>
                      </div>
                    </div>

                    {/* Genişletilmiş Detaylar */}
                    {secilenBeceri === beceri.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h6 className="font-medium text-gray-900 mb-2">Tüm Öğrenme Kaynakları:</h6>
                        <div className="space-y-2">
                          {beceri.kaynaklar.map((kaynak, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                              <div className="flex items-center">
                                <span className="text-sm mr-2">
                                  {kaynak.tip === 'Video' ? '📹' : 
                                   kaynak.tip === 'Kurs' ? '🎓' : 
                                   kaynak.tip === 'Kitap' ? '📚' : '🛠️'}
                                </span>
                                <div>
                                  <div className="text-sm font-medium">{kaynak.baslik}</div>
                                  <div className="text-xs text-gray-600">{kaynak.tip}</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {kaynak.ucretsiz && (
                                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Ücretsiz</span>
                                )}
                                <a 
                                 href={kaynak.link} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                               >
                                 Git →
                               </a>
                             </div>
                           </div>
                         ))}
                       </div>
                     </div>
                   )}

                 </div>
               </div>
             ))}
           </div>
         </div>

         {/* Sağ Kolon - Özet ve Araçlar */}
         <div className="space-y-6">
           
           {/* İlerleme Takibi */}
           <div className="bg-white rounded-lg shadow p-6">
             <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 İlerleme Takibi</h3>
             <div className="space-y-4">
               <div>
                 <div className="flex justify-between items-center mb-1">
                   <span className="text-sm text-gray-600">Genel İlerleme</span>
                   <span className="text-sm font-medium">%15</span>
                 </div>
                 <div className="w-full bg-gray-200 rounded-full h-2">
                   <div className="bg-blue-600 h-2 rounded-full w-3"></div>
                 </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4 text-center">
                 <div className="p-3 bg-blue-50 rounded-lg">
                   <div className="text-lg font-bold text-blue-600">0/{eksikBeceriler.length}</div>
                   <div className="text-xs text-blue-800">Tamamlanan</div>
                 </div>
                 <div className="p-3 bg-orange-50 rounded-lg">
                   <div className="text-lg font-bold text-orange-600">1</div>
                   <div className="text-xs text-orange-800">Devam Eden</div>
                 </div>
               </div>
             </div>
           </div>

           {/* Haftalık Plan */}
           <div className="bg-white rounded-lg shadow p-6">
             <h3 className="text-lg font-semibold text-gray-900 mb-4">🗓️ Bu Haftanın Planı</h3>
             <div className="space-y-3">
               <div className="flex items-center p-2 bg-green-50 rounded">
                 <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                 <div className="flex-1">
                   <div className="text-sm font-medium">JavaScript Temelleri</div>
                   <div className="text-xs text-gray-600">2 saat - Video izle</div>
                 </div>
               </div>
               <div className="flex items-center p-2 bg-yellow-50 rounded">
                 <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                 <div className="flex-1">
                   <div className="text-sm font-medium">Pratik Projesi</div>
                   <div className="text-xs text-gray-600">3 saat - Kodlama</div>
                 </div>
               </div>
               <div className="flex items-center p-2 bg-purple-50 rounded">
                 <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                 <div className="flex-1">
                   <div className="text-sm font-medium">Kaynak Okuma</div>
                   <div className="text-xs text-gray-600">1 saat - Doküman</div>
                 </div>
               </div>
             </div>
           </div>

           {/* Motivasyon */}
           <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-lg p-6 text-white">
             <h3 className="text-lg font-semibold mb-2">🎯 Hedefinize Yakınsınız!</h3>
             <p className="text-green-100 text-sm mb-4">
               Tutarlı çalışmayla 4-6 ay içinde {meslekAdi} pozisyonuna hazır olacaksınız.
             </p>
             <div className="flex items-center justify-between">
               <div>
                 <div className="text-2xl font-bold">127</div>
                 <div className="text-xs text-green-100">Günde ortalama</div>
               </div>
               <Link 
                 href="/chat"
                 className="bg-white text-green-600 px-3 py-2 rounded text-sm font-medium hover:bg-gray-100"
               >
                 Motivasyon Al 🚀
               </Link>
             </div>
           </div>

           {/* Topluluk */}
           <div className="bg-white rounded-lg shadow p-6">
             <h3 className="text-lg font-semibold text-gray-900 mb-4">👥 Öğrenme Topluluğu</h3>
             <div className="space-y-3">
               <div className="flex items-center text-sm">
                 <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
                   A
                 </div>
                 <div>
                   <div className="font-medium">Ahmet K.</div>
                   <div className="text-gray-600 text-xs">JavaScript tamamladı</div>
                 </div>
               </div>
               <div className="flex items-center text-sm">
                 <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
                   M
                 </div>
                 <div>
                   <div className="font-medium">Merve S.</div>
                   <div className="text-gray-600 text-xs">React'e başladı</div>
                 </div>
               </div>
               <div className="flex items-center text-sm">
                 <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
                   C
                 </div>
                 <div>
                   <div className="font-medium">Can Y.</div>
                   <div className="text-gray-600 text-xs">Projesini paylaştı</div>
                 </div>
               </div>
             </div>
             <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded text-sm hover:bg-gray-200">
               Topluluğa Katıl
             </button>
           </div>

           {/* AI Danışman */}
           <div className="bg-purple-50 rounded-lg p-6">
             <h3 className="text-lg font-semibold text-purple-900 mb-3">🤖 AI Önerileri</h3>
             <p className="text-purple-800 text-sm mb-4">
               "JavaScript'e odaklanın. İlk 2 hafta temel syntax'ı öğrenin, sonra mini projeler yapın."
             </p>
             <div className="flex space-x-2">
               <Link 
                 href="/chat"
                 className="bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700"
               >
                 Daha Fazla Öneri
               </Link>
               <button className="border border-purple-300 text-purple-700 px-3 py-2 rounded text-sm hover:bg-purple-100">
                 Planı Güncelle
               </button>
             </div>
           </div>

         </div>
       </div>

       {/* Alt Aksiyon Çubuğu */}
       <div className="mt-12 bg-white rounded-lg shadow p-6">
         <div className="flex items-center justify-between">
           <div>
             <h4 className="text-lg font-semibold text-gray-900">Planınızı Başlatmaya Hazır mısınız?</h4>
             <p className="text-gray-600">İlk adımınızı atın ve tutarlı kalın!</p>
           </div>
           <div className="flex space-x-3">
             <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold">
               🚀 Planı Başlat
             </button>
             <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50">
               📧 Email Gönder
             </button>
             <Link 
               href="/chat"
               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
             >
               💬 AI ile Konuş
             </Link>
           </div>
         </div>
       </div>

     </main>
   </div>
 );
}