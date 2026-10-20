import { isValidElement, type ReactNode } from 'react'

// Single source for heading ids: used by the rendered MDX headings and by the table of contents
export function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+|-+$/g, '') // Remove leading and trailing -
}

// Plain text of rendered heading children (e.g. `## **bold** heading` renders as nested elements)
export function textContent(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }
  if (Array.isArray(node)) {
    return node.map(textContent).join('')
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textContent(node.props.children)
  }
  return ''
}

// Plain text of a raw markdown heading, matching what textContent returns once it is rendered
export function stripInlineMarkdown(markdown: string) {
  return markdown
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // Links and images keep their text
    .replace(/(\*\*|__|\*|`)/g, '') // Emphasis and inline code markers
    .trim()
}
