import { BlogPosts } from 'app/components/posts'
import { Metadata } from 'next'
import { baseUrl } from '../sitemap'

const title = 'Blog'
const description =
  'Articoli sullo sviluppo agentico e sull’AI applicata allo sviluppo software, da chi la usa ogni giorno in produzione.'
const ogImage = `${baseUrl}/og?title=${encodeURIComponent(title)}`

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    url: `${baseUrl}/blog`,
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
  alternates: {
    canonical: `${baseUrl}/blog`
  }
}

export default function Page() {
  return (
    <section>
      <h1 className='display title text-4xl text-ink sm:text-5xl'>Blog</h1>
      <p className='mt-4 mb-10 font-sans text-lg text-muted'>{description}</p>
      <BlogPosts />
    </section>
  )
}
