import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts({ limit }: { limit?: number }) {
  let allBlogs = getBlogPosts(limit)

  return (
    <div>
      {allBlogs.map(post => (
        <div key={post.slug} className='mb-4 flex flex-col space-y-1'>
          <div className='flex w-full flex-col space-x-0 md:flex-row md:space-x-2'>
            <p className='w-[100px] tabular-nums text-neutral-600 dark:text-neutral-400'>
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <Link href={`/blog/${post.slug}`} className='interlink tracking-tight'>
              {post.metadata.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
