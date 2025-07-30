import Link from 'next/link';

export default function KullaniciPaneli() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Kullanıcı Paneli
            </h1>
            <div className="flex space-x-4">
              <span className="text-gray-600">Hoş geldiniz!</span>
              <button className="text-red-600 hover:text-red-800">
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Profil Kartı */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Profilim
            </h2>
            <p className="text-gray-600 mb-4">
              Kişisel bilgilerinizi ve tercihlerinizi yönetin
            </p>
            <Link 
              href="/profile"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors inline-block"
            >
              Profili Düzenle
            </Link>
          </div>

          {/* Değerlendirme Kartı */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Değerlendirme Testi
            </h2>
            <p className="text-gray-600 mb-4">
              Kişiselleştirilmiş tercih testi alın
            </p>
            <Link 
              href="/assessment"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors inline-block"
            >
              Test Başlat
            </Link>
          </div>

          {/* Sonuçlar Kartı */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Sonuçlarım
            </h2>
            <p className="text-gray-600 mb-4">
              Geçmiş analizlerinizi görüntüleyin
            </p>
            <Link 
              href="/results"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors inline-block"
            >
              Sonuçları Gör
            </Link>
          </div>

          {/* AI Danışman Kartı */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              AI Danışman
            </h2>
            <p className="text-gray-600 mb-4">
              Yapay zeka danışmanla sohbet edin
            </p>
            <Link 
              href="/chat"
              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors inline-block"
            >
              Sohbet Başlat
            </Link>
          </div>

          {/* İstatistikler Kartı */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              İstatistikler
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Tamamlanan testler:</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Alınan öneriler:</span>
                <span className="font-medium">0</span>
              </div>
            </div>
          </div>

          {/* Hızlı Başlangıç */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-lg font-medium text-blue-900 mb-4">
              Başlangıç Rehberi
            </h2>
            <ol className="text-sm text-blue-800 space-y-2">
              <li>1. Profilinizi tamamlayın</li>
              <li>2. Değerlendirme testi alın</li>
              <li>3. Sonuçlarınızı inceleyin</li>
              <li>4. AI danışmanla konuşun</li>
            </ol>
          </div>

        </div>
      </main>
    </div>
  );
}