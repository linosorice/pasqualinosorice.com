import Link from 'next/link'
import { displayTitle, formatDate, getBlogPosts } from 'app/blog/utils'

export type Post = ReturnType<typeof getBlogPosts>[number]

export function PostMeta({ post, className = '' }: { post: Post; className?: string }) {
  return (
    <p className={`font-mono text-sm text-muted ${className}`}>
      <time dateTime={post.metadata.publishedAt}>{formatDate(post.metadata.publishedAt)}</time>
      {' · '}
      {post.readingTime} min di lettura
    </p>
  )
}

export function BlogPosts({
  limit,
  exclude,
  heading: Heading = 'h2'
}: {
  limit?: number
  // Slug already shown elsewhere on the page
  exclude?: string
  heading?: 'h2' | 'h3'
}) {
  let posts = getBlogPosts()
    .filter(post => post.slug !== exclude)
    .slice(0, limit)

  return (
    <ul className='divide-y divide-line border-y border-line'>
      {posts.map(post => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`} className='group block py-6'>
            <Heading className='display title text-xl leading-snug text-ink transition-colors group-hover:text-accent sm:text-[1.375rem]'>
              {displayTitle(post.metadata.title)}
            </Heading>
            <p className='mt-2 line-clamp-2 font-sans text-muted'>{post.metadata.summary}</p>
            <PostMeta post={post} className='mt-3' />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function FeaturedPost({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className='featured group block border border-line bg-surface p-6 sm:p-8'
    >
      <p className='kicker'>Da leggere per primo</p>
      <h2 className='display title mt-3 text-2xl leading-tight text-ink transition-colors group-hover:text-accent sm:text-3xl'>
        {displayTitle(post.metadata.title)}
      </h2>
      <p className='mt-4 font-sans text-ink-soft sm:text-lg'>{post.metadata.summary}</p>
      <p className='mt-6 flex items-center gap-2 font-mono text-sm'>
        <span className='font-medium text-accent'>Leggi l’articolo</span>
        <span
          aria-hidden
          className='text-accent transition-transform group-hover:translate-x-1 motion-reduce:transition-none'
        >
          →
        </span>
        <span className='text-muted'>· {post.readingTime} min</span>
      </p>
    </Link>
  )
}
