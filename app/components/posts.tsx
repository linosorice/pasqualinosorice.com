import Link from 'next/link'
import { displayTitle, formatDate, getBlogPosts } from 'app/blog/utils'

export type Post = ReturnType<typeof getBlogPosts>[number]

export function PostMeta({ post, className = '' }: { post: Post; className?: string }) {
  return (
    <p className={`font-meta text-muted text-sm ${className}`}>
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
    <ul className='divide-line border-line divide-y border-y'>
      {posts.map(post => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`} className='group block py-6'>
            <Heading className='display title text-ink group-hover:text-accent text-xl leading-snug transition-colors sm:text-[1.375rem]'>
              {displayTitle(post.metadata.title)}
            </Heading>
            <p className='font-body text-muted mt-2 line-clamp-2'>{post.metadata.summary}</p>
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
      className='featured group border-line bg-surface rounded-card block border p-6 sm:p-8'
    >
      <p className='kicker'>Da leggere per primo</p>
      <h2 className='display title text-ink group-hover:text-accent mt-3 text-2xl leading-tight transition-colors sm:text-3xl'>
        {displayTitle(post.metadata.title)}
      </h2>
      <p className='font-body text-ink-soft mt-4 sm:text-lg'>{post.metadata.summary}</p>
      <p className='font-ui mt-6 flex items-center gap-2 text-sm'>
        <span className='text-accent font-medium'>Leggi l’articolo</span>
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
