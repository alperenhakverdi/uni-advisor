import Link from 'next/link';

export default function ProfilSayfasi() {
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
              Profil Düzenle
            </h1>
            <div></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-8">
          <form className="space-y-8">
            
            {/* Temel Bilgiler */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="text-2xl mr-3">👤</span>
                Temel Bilgiler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Adınız"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soyad
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                    placeholder="Soyadınız"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ornek@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yaş Aralığı
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Seçiniz</option>
                    <option value="16-18">16-18 yaş</option>
                    <option value="19-22">19-22 yaş</option>
                    <option value="23-26">23-26 yaş</option>
                    <option value="27-30">27-30 yaş</option>
                    <option value="30+">30+ yaş</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Eğitim ve Durum Bilgileri */}
            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="text-2xl mr-3">🎓</span>
                Eğitim ve Durum Bilgileri
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Eğitim Durumu
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Seçiniz</option>
                    <option value="lise">Lise Öğrencisi</option>
                    <option value="lise-mezun">Lise Mezunu</option>
                    <option value="universite">Üniversite Öğrencisi</option>
                    <option value="universite-mezun">Üniversite Mezunu</option>
                    <option value="yuksek-lisans">Yüksek Lisans</option>
                    <option value="doktora">Doktora</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mevcut Durum
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Seçiniz</option>
                    <option value="ogrenci">Öğrenci</option>
                    <option value="calisan">Çalışan</option>
                    <option value="is-arayan">İş Arayan</option>
                    <option value="kariyer-degistirme">Kariyer Değiştirme Planlıyor</option>
                    <option value="girisimci">Girişimci/Serbest Meslek</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yaşadığınız Şehir
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Seçiniz</option>
                    <option value="istanbul">İstanbul</option>
                    <option value="ankara">Ankara</option>
                    <option value="izmir">İzmir</option>
                    <option value="bursa">Bursa</option>
                    <option value="antalya">Antalya</option>
                    <option value="adana">Adana</option>
                    <option value="konya">Konya</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aile Ekonomik Durumu
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Seçiniz</option>
                    <option value="dusuk">Düşük Gelir</option>
                    <option value="orta">Orta Gelir</option>
                    <option value="yuksek">Yüksek Gelir</option>
                    <option value="kendim-karsiliyorum">Kendi Giderlerimi Karşılıyorum</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Akademik Bilgiler */}
            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="text-2xl mr-3">📊</span>
                Akademik Bilgiler (Opsiyonel)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TYT Puanı
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="TYT puanınız"
                    min="0"
                    max="500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    AYT Puanı
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="AYT puanınız"
                    min="0"
                    max="500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Genel Not Ortalaması
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2.5 - 4.0 arası"
                    min="0"
                    max="4"
                  />
                </div>
              </div>
            </div>

            {/* Yetenek Öz-Değerlendirmesi */}
            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                Yetenek Öz-Değerlendirmesi
              </h2>
              <p className="text-gray-600 mb-6">Aşağıdaki becerilerde kendinizi 1-10 arası puanlayın (1: Çok zayıf, 10: Çok güçlü)</p>
              
              <div className="space-y-6">
                {[
                  { key: 'matematik', label: 'Matematik / Sayısal Beceriler', icon: '🔢' },
                  { key: 'sozel', label: 'Sözel İletişim / Dil Becerileri', icon: '💬' }, 
                  { key: 'teknik', label: 'Teknik / El Becerisi', icon: '🔧' },
                  { key: 'liderlik', label: 'Liderlik / Yönetim', icon: '👑' },
                  { key: 'yaraticilik', label: 'Yaratıcılık / Sanatsal', icon: '🎨' },
                  { key: 'problem', label: 'Problem Çözme / Analitik Düşünce', icon: '🧩' },
                  { key: 'sosyal', label: 'Sosyal Beceriler / Empati', icon: '🤝' },
                  { key: 'organizasyon', label: 'Organizasyon / Planlama', icon: '📋' }
                ].map((beceri) => (
                  <div key={beceri.key} className="flex items-center space-x-4">
                    <span className="text-2xl">{beceri.icon}</span>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {beceri.label}
                      </label>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500 w-12">Zayıf</span>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          defaultValue="5"
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <span className="text-sm text-gray-500 w-12">Güçlü</span>
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          5
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* İlgi Alanları */}
            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="text-2xl mr-3">❤️</span>
                İlgi Alanları ve Hobiler
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  'Teknoloji', 'Sanat', 'Spor', 'Müzik', 'Okuma', 'Yazma',
                  'Fotoğrafçılık', 'Tasarım', 'Oyun', 'Sinema', 'Seyahat', 'Yemek',
                  'Doğa', 'Bilim', 'Tarih', 'Psikoloji', 'Eğitim', 'Sağlık',
                  'İş Dünyası', 'Girişimcilik', 'Sosyal Medya', 'Moda'
                ].map((alan) => (
                  <label key={alan} className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm text-gray-700">{alan}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Gelecek Hedefleri */}
            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="text-2xl mr-3">🚀</span>
                Gelecek Hedefleri ve Beklentileri
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kariyer Hedefiniz (Serbest Metin)
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Gelecekle ilgili hedeflerinizi, hayallerinizi ve planlarınızı detaylarıyla yazın..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ne Kadar Sürede Hedeflerinize Ulaşmak İstiyorsunuz?
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Seçiniz</option>
                    <option value="1-yil">1 yıl içinde</option>
                    <option value="2-yil">2 yıl içinde</option>
                    <option value="3-5-yil">3-5 yıl içinde</option>
                    <option value="5-10-yil">5-10 yıl içinde</option>
                    <option value="uzun-vade">Uzun vadeli (10+ yıl)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Butonlar */}
            <div className="border-t pt-8 flex justify-end space-x-4">
              <Link
                href="/dashboard"
                className="px-8 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
              >
                İptal
              </Link>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
              >
                Profili Kaydet
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}