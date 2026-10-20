import { BlogPosts } from 'app/components/posts'
import { Metadata } from 'next'
import { baseUrl } from '../sitemap'

const title = 'Blog'
const description =
  'Explore our blog for in-depth articles on AI, technology, and innovation. Stay updated with the latest trends and insights in artificial intelligence.'
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
      <h1 className='mb-8 text-2xl font-semibold tracking-tighter'>read my blog</h1>
      <BlogPosts />
    </section>
  )
}
