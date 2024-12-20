import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map(post => ({
    slug: post.slug
  }))
}

export function generateMetadata({ params }) {
  let post = getBlogPosts().find(post => post.slug === params.slug)
  if (!post) {
    return
  }

  let { title, publishedAt: publishedTime, summary: description, image } = post.metadata
  let ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
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
      canonical: `${baseUrl}/blog/${post.slug}`
    }
  }
}

export default function Blog({ params }) {
  let post = getBlogPosts().find(post => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <section>
      <script
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            'headline': post.metadata.title,
            'datePublished': post.metadata.publishedAt,
            'dateModified': post.metadata.publishedAt,
            'description': post.metadata.summary,
            'image': post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            'url': `${baseUrl}/blog/${post.slug}`,
            'author': {
              '@type': 'Person',
              'name': 'Pasqualino Sorice'
            }
          })
        }}
      />
      <h1 className='title text-2xl font-semibold tracking-tighter'>{post.metadata.title}</h1>
      <div className='mt-2 mb-8 flex items-center justify-between text-sm'>
        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className='prose'>
        <div className='mb-8'>
          <h2 className='mb-2 text-lg font-medium'>Table of Contents</h2>
          <div className='space-y-1'>
            {post.content
              .split('\n')
              .map((line, index) => {
                const match = line.match(/^(#{2,6})\s+(.+)/)
                if (match) {
                  const level = match[1].length - 1
                  const title = match[2]
                  return (
                    <div key={index} style={{ paddingLeft: `${(level - 1) * 1}rem` }}>
                      <a
                        href={`${baseUrl}/blog/${post.slug}#${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        className='text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
                      >
                        {title}
                      </a>
                    </div>
                  )
                }
                return null
              })
              .filter(Boolean)}
          </div>
        </div>
        <CustomMDX source={post.content} slug={post.slug} />
      </article>
    </section>
  )
}
