import { BlogPosts } from 'app/components/posts'
import { Metadata } from 'next'
import { baseUrl } from '../sitemap'

const metadata: Metadata = {
  title: 'Blog | Pasqualino Sorice',
  description:
    'Explore our blog for in-depth articles on AI, technology, and innovation. Stay updated with the latest trends and insights in artificial intelligence.',
  alternates: {
    canonical: `${baseUrl}/blog`
  }
}

export function generateMetadata() {
  if (!metadata.title || !metadata.description) {
    return
  }
  let ogImage = `${baseUrl}/og?title=${encodeURIComponent(metadata.title as string)}`

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
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
      title: metadata.title,
      description: metadata.description,
      images: [ogImage]
    },
    alternates: {
      canonical: `${baseUrl}/blog`
    }
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
