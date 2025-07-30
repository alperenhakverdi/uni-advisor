import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Üniversite Tercih Danışmanı',
  description: 'Yapay zeka destekli akıllı tercih sistemi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}