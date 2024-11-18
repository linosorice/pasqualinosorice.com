import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { GoogleTagManager } from '@next/third-parties/google'

const title = 'Pasqualino Sorice - AI & Insurtech'
const description =
  "Explore Pasqualino Sorice's AI-driven innovations in insurtech. Dive into his insights on artificial intelligence, technology, and the future of insurance."
const ogImage = `${baseUrl}/og.png`

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
    locale: 'en_US',
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
    <html
      lang='en'
      className={cx(
        'bg-white text-black dark:bg-black dark:text-white',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID ?? ''} />
      <body className='mx-4 mt-8 max-w-xl antialiased md:mx-auto'>
        <main className='mt-6 flex min-w-0 flex-auto flex-col px-2 md:px-0'>
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
