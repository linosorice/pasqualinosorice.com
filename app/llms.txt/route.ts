import { baseUrl } from 'app/sitemap'
import { getBlogPosts } from 'app/blog/utils'

export const dynamic = 'force-static'

// https://llmstxt.org: a plain-text index of the site for AI assistants
export async function GET() {
  let posts = getBlogPosts()
    .map(
      post => `- [${post.metadata.title}](${baseUrl}/blog/${post.slug}): ${post.metadata.summary}`
    )
    .join('\n')

  let body = `# Pasqualino Sorice

> CTO of MioAssicuratore since 2020. Writes about AI-powered software development.

## Blog

${posts}
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  })
}
