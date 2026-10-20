import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getReplacements, isPublished, normalizeDate, postsDir } from 'app/blog/publishing'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
  // Slug of an older post this one supersedes once published (see app/blog/publishing.js)
  replaces?: string
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter(file => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
  let { data, content } = matter(fs.readFileSync(filePath, 'utf-8'))
  let publishedAt = normalizeDate(data.publishedAt)

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
  let data = getMDXData(postsDir)
  let replaced = new Set(getReplacements().map(({ from }) => from))

  const filteredData = data.filter(
    post => isPublished(post.metadata.publishedAt) && !replaced.has(post.slug)
  )

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
