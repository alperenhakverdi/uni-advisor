'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/auth-client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    console.log('Login attempt:', { email }) // Debug

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: email.trim(), // ✅ DÜZELTME: Trim ekle
        password: password,
      })

      console.log('Login response:', { data, error: loginError }) // Debug

      if (loginError) {
        console.error('Login error details:', loginError)
        
        // Spesifik hata mesajları
        if (loginError.message.includes('Invalid login credentials')) {
          setError('E-posta veya şifre hatalı')
        } else if (loginError.message.includes('Email not confirmed')) {
          setError('E-posta adresinizi doğrulamanız gerekiyor')
        } else {
          setError(`Giriş hatası: ${loginError.message}`)
        }
        setLoading(false)
        return
      }

      if (data?.user) {
        console.log('Login successful, user:', data.user.id)
        
        // ✅ BASIT YÖNLENDİRME: Direkt dashboard'a git
        window.location.href = '/dashboard'
        
      } else {
        setError('Giriş başarısız: Kullanıcı bilgisi alınamadı')
      }

    } catch (err) {
      console.error('Login catch error:', err)
      setError('Giriş yapılırken beklenmeyen bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              CareerPath AI
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Hesabınıza Giriş Yapın
            </h2>
            <p className="text-gray-600">
              Kariyer yolculuğunuza devam edin
            </p>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              <strong>Hata:</strong> {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-posta Adresi
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Kayıt olduğunuz e-posta"
              />
              <div className="text-xs text-gray-500 mt-1">
                Girdiğiniz e-posta: {email}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Şifrenizi girin"
              />
              <div className="text-xs text-gray-500 mt-1">
                Şifre uzunluğu: {password.length} karakter
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white font-medium ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              } transition-colors`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Giriş yapılıyor...
                </div>
              ) : (
                'Giriş Yap'
              )}
            </button>
          </div>

          {/* DEBUG BİLGİLERİ */}
          <div className="bg-gray-100 p-3 rounded text-xs">
            <strong>Debug Info:</strong><br/>
            Email: {email}<br/>
            Password Length: {password.length}<br/>
            F12 → Console'dan detayları görebilirsiniz
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Hesabınız yok mu?{" "}
              <Link href="/register" className="text-blue-600 hover:underline font-medium">
                Kayıt olun
              </Link>
            </p>
          </div>

          <div className="text-center">
            <Link 
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Ana sayfaya dön
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}