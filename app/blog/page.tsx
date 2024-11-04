import { BlogPosts } from 'app/components/posts'
import { Metadata } from 'next'
import { baseUrl } from '../sitemap'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'read my blog.',
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
