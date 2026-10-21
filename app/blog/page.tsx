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
      <h1 className='display title text-ink text-4xl sm:text-5xl'>Blog</h1>
      <p className='font-body text-muted mt-4 mb-10 text-lg'>{description}</p>
      <BlogPosts />
    </section>
  )
}
