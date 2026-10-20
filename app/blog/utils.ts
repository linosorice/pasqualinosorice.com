import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter(file => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
  let { data, content } = matter(fs.readFileSync(filePath, 'utf-8'))
  // Unquoted YAML dates are parsed as Date objects: normalize them to YYYY-MM-DD
  let publishedAt =
    data.publishedAt instanceof Date
      ? data.publishedAt.toISOString().slice(0, 10)
      : String(data.publishedAt)

  return { metadata: { ...data, publishedAt } as Metadata, content: content.trim() }
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map(file => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content
    }
  })
}

export function getBlogPosts(limit?: number) {
  let data = getMDXData(path.join(process.cwd(), 'app', 'blog', 'posts'))
  const currentDate = new Date()

  // Filter out future posts
  const filteredData = data.filter(post => {
    const postDate = new Date(post.metadata.publishedAt)
    return postDate <= currentDate
  })

  const sortedData = filteredData.sort((a, b) => {
    if (a.metadata.publishedAt > b.metadata.publishedAt) {
      return -1
    }
    return 1
  })

  if (limit) {
    return sortedData.slice(0, limit)
  }
  return sortedData
}

export function formatDate(date: string) {
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }

  return new Date(date).toLocaleString('it-IT', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}
