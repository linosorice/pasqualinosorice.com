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

> CTO di MioAssicuratore dal 2020. Racconta come il suo team sviluppa software con gli agenti AI, che oggi scrivono il codice: cosa funziona, cosa no e cosa ha imparato.

## Blog

${posts}
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  })
}
