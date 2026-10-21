import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Newsreader } from 'next/font/google'
import { Navbar } from './components/nav'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { StyleSwitcher } from './components/style-switcher'
import { canSwitchStyle, defaultStyle, styleInitScript } from './design'

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-newsreader'
})

const title = 'Pasqualino Sorice - CTO di MioAssicuratore'
const description =
  'CTO di MioAssicuratore. Racconto come sviluppiamo software con gli agenti AI: cosa funziona, cosa no e cosa ho imparato strada facendo.'
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
    <html
      lang='it'
      data-style={defaultStyle}
      // The init script may switch the style before hydration
      suppressHydrationWarning
      className={cx(GeistSans.variable, GeistMono.variable, newsreader.variable)}
    >
      <head>
        {canSwitchStyle && <script dangerouslySetInnerHTML={{ __html: styleInitScript }} />}
      </head>
      <body className='mx-4 mt-8 max-w-xl antialiased md:mx-auto'>
        <main className='mt-6 flex min-w-0 flex-auto flex-col px-2 md:px-0'>
          <Navbar />
          {children}
          <Footer />
        </main>
        {canSwitchStyle && <StyleSwitcher />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
