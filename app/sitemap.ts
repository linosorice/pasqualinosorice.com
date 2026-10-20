import { getBlogPosts } from 'app/blog/utils'

export const baseUrl = 'https://www.pasqualinosorice.com'

export default async function sitemap() {
  let posts = getBlogPosts()
  let blogs = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt
  }))

  // Home and blog index change when a new post is published
  let latestPost = posts[0]?.metadata.publishedAt
  let routes = ['', '/blog'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: latestPost
  }))

  return [...routes, { url: `${baseUrl}/consulenza` }, ...blogs]
}
