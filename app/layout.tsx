import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

const title = 'Pasqualino Sorice - CTO di MioAssicuratore'
const description =
  'CTO di MioAssicuratore. Racconto come sviluppiamo software con gli agenti AI: cosa funziona, cosa no e cosa ho imparato strada facendo.'
const ogImage = `${baseUrl}/og`

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: title,
    template: '%s | Pasqualino Sorice'
  },
  description,
  openGraph: {
    title,
    description,
    url: baseUrl,
    siteName: title,
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: ogImage
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage]
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='it' className={cx(GeistSans.variable, GeistMono.variable)}>
      <body className='antialiased'>
        <a
          href='#contenuto'
          className='sr-only fixed top-3 left-3 z-50 rounded bg-ink px-3 py-2 font-mono text-sm text-paper focus:not-sr-only'
        >
          Vai al contenuto
        </a>
        <div className='mx-auto w-full max-w-[44rem] px-5'>
          <Navbar />
          <main id='contenuto' className='min-w-0'>
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
