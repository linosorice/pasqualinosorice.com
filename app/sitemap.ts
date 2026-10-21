import { getBlogPosts } from 'app/blog/utils'

export const baseUrl = 'https://www.pasqualinosorice.com'

export default async function sitemap() {
  let posts = getBlogPosts()
  let blogs = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt.slice(0, 10)
  }))

  // Home and blog index change when a new post is published
  let latestPost = posts[0]?.metadata.publishedAt.slice(0, 10)
  let routes = ['', '/blog'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: latestPost
  }))

  return [...routes, ...blogs]
}
