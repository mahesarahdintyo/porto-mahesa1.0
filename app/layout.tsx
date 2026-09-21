import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Noto_Serif_JP, Inter, Zen_Kurenaido } from 'next/font/google'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { SmoothScroll } from '@/components/smooth-scroll'
import './globals.css'

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const zenKurenaido = Zen_Kurenaido({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-accent',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KUROHANA 黒花 — Mahesa Rahdintyo',
  description:
    'A portfolio between bloom and decay. Creative developer and designer Mahesa Rahdintyo builds digital experiences that feel alive, strange, and impossible to forget.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4EEE4' },
    { media: '(prefers-color-scheme: dark)', color: '#050506' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${notoSerifJP.variable} ${inter.variable} ${zenKurenaido.variable}`}>
      <body className="antialiased font-body">
        <ThemeProvider>
          <SmoothScroll />
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
