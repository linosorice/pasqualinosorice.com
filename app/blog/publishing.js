// Publishing rules shared by app/blog/utils.ts and next.config.js (which can't import TypeScript)
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const postsDir = path.join(process.cwd(), 'app', 'blog', 'posts')

// Future posts are hidden in production only; previews and local builds show them for review
function isPublished(publishedAt, now = new Date()) {
  return process.env.VERCEL_ENV !== 'production' || new Date(publishedAt) <= now
}

// A post can declare `replaces: <old-slug>` in its frontmatter: once it is published,
// the old post disappears from the site and its URL redirects to the new one
function getReplacements() {
  return fs
    .readdirSync(postsDir)
    .filter(file => path.extname(file) === '.mdx')
    .flatMap(file => {
      let { data } = matter(fs.readFileSync(path.join(postsDir, file), 'utf-8'))
      if (!data.replaces || !isPublished(normalizeDate(data.publishedAt))) {
        return []
      }
      return [{ from: data.replaces, to: path.basename(file, '.mdx') }]
    })
}

// Unquoted YAML dates are parsed as Date objects: normalize them to YYYY-MM-DD
function normalizeDate(value) {
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value)
}

module.exports = { postsDir, isPublished, getReplacements, normalizeDate }
