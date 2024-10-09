import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blog',
  description: 'read my blog.'
}

export default function Page() {
  return (
    <section>
      <h1 className='mb-8 text-2xl font-semibold tracking-tighter'>read my blog</h1>
      <BlogPosts />
    </section>
  )
}
