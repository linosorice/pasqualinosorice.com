import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { GoogleTagManager } from '@next/third-parties/google'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Pasqualino Sorice - Insurtech Innovator, Digital Pioneer, and Devoted Father',
    template: '%s | Pasqualino Sorice - Insurtech Innovator, Digital Pioneer, and Devoted Father'
  },
  description:
    'Discover the journey of Pasqualino Sorice, an insurtech innovator, digital pioneer, and devoted father. Explore his insights on technology, insurance and AI.',
  openGraph: {
    title: 'Pasqualino Sorice - Insurtech Innovator, Digital Pioneer, and Devoted Father',
    description:
      'Discover the journey of Pasqualino Sorice, an insurtech innovator, digital pioneer, and devoted father. Explore his insights on technology, insurance and AI.',
    url: baseUrl,
    siteName: 'Pasqualino Sorice',
    locale: 'en_US',
    type: 'website'
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
