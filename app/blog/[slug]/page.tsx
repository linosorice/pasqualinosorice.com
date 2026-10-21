import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { ContactNote } from 'app/components/cta'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { slugify, stripInlineMarkdown } from 'app/blog/slugify'
import { baseUrl } from 'app/sitemap'

type Props = { params: Promise<{ slug: string }> }

// Only the posts known at build time exist: unknown slugs are a static 404
export const dynamicParams = false

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map(post => ({
    slug: post.slug
  }))
}

function absoluteUrl(url: string) {
  return url.startsWith('/') ? `${baseUrl}${url}` : url
}

function postImage(title: string, image?: string) {
  return image ? absoluteUrl(image) : `${baseUrl}/og?title=${encodeURIComponent(title)}`
}

// h2-h6 of the raw MDX, skipping fenced code blocks
function getHeadings(content: string) {
  let inCodeBlock = false

  return content.split('\n').flatMap(line => {
    if (line.trimStart().startsWith('```')) {
      inCodeBlock = !inCodeBlock
    }
    let match = !inCodeBlock && line.match(/^(#{2,6})\s+(.+)/)
    if (!match) {
      return []
    }
    let title = stripInlineMarkdown(match[2])
    return [{ level: match[1].length - 1, title, slug: slugify(title) }]
  })
}

export async function generateMetadata({ params }: Props) {
  let { slug } = await params
  let post = getBlogPosts().find(post => post.slug === slug)
  if (!post) {
    return
  }

  let { title, publishedAt: publishedTime, summary: description, image } = post.metadata
  let ogImage = postImage(title, image)

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

export default async function Blog({ params }: Props) {
  let { slug } = await params
  let post = getBlogPosts().find(post => post.slug === slug)

  if (!post) {
    notFound()
  }

  let headings = getHeadings(post.content)

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
            'image': postImage(post.metadata.title, post.metadata.image),
            'url': `${baseUrl}/blog/${post.slug}`,
            'mainEntityOfPage': `${baseUrl}/blog/${post.slug}`,
            'author': {
              '@type': 'Person',
              'name': 'Pasqualino Sorice',
              'url': baseUrl
            }
          })
        }}
      />
      <h1 className='title text-2xl font-semibold tracking-tighter'>{post.metadata.title}</h1>
      <div className='mt-2 mb-8 flex items-center justify-between text-sm'>
        <p className='text-muted text-sm'>{formatDate(post.metadata.publishedAt)}</p>
      </div>
      <article className='prose'>
        {headings.length > 0 && (
          <nav className='mb-8' aria-label='Indice'>
            <h2 className='mb-2 text-lg font-medium'>Indice</h2>
            <div className='space-y-1'>
              {headings.map(({ level, title, slug }, index) => (
                <div key={index} style={{ paddingLeft: `${(level - 1) * 1}rem` }}>
                  <a href={`#${slug}`} className='text-muted hover:text-ink'>
                    {title}
                  </a>
                </div>
              ))}
            </div>
          </nav>
        )}
        <CustomMDX source={post.content} />
      </article>
      <ContactNote />
    </section>
  )
}
