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

> CTO di MioAssicuratore dal 2020. Ha impostato un sistema di agenti AI che sviluppano software al posto di un team di sviluppo, e qui racconta come lavora e cosa ha imparato.

## Blog

${posts}
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  })
}
