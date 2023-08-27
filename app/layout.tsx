import './global.css'
import clsx from 'clsx'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Sidebar from './components/sidebar'
import Script from 'next/script'
import { GTM_ID } from 'lib/gtm'

const graphik = localFont({
  src: [
    {
      path: '../public/fonts/Graphik-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/Graphik-Medium.ttf',
      weight: '600',
      style: 'bold'
    }
  ],
  variable: '--font-graphik',
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://pasqualinosorice.com'),
  title: {
    default: 'Pasqualino Sorice',
    template: '%s | Pasqualino Sorice'
  },
  description:
    'Navigating insurtech revolution, aspiring for a digital empire and mastering fatherhood.',
  openGraph: {
    title: 'Pasqualino Sorice',
    description:
      'Navigating insurtech revolution, aspiring for a digital empire and mastering fatherhood.',
    url: 'https://pasqualinosorice.com',
    siteName: 'Pasqualino Sorice',
    locale: 'en-US',
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
  },
  twitter: {
    title: 'Pasqualino Sorice',
    card: 'summary_large_image'
  },
  verification: {
    google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
    yandex: '14d2e73487fa6c71'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      className={clsx('text-black bg-white dark:text-white dark:bg-[#111010]', graphik.variable)}
    >
      <body className='antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto'>
        <Script id='google-tag-manager' strategy='afterInteractive'>
          {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
        `}
        </Script>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`
          }}
        />
        <main className='flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0'>
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  )
}
