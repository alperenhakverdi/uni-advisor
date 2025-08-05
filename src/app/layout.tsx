import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from 'next-themes' // dark/light modu için

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
    <html lang="tr" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
