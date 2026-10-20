import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import { imageSize } from 'image-size'
import React from 'react'
import { slugify, textContent } from 'app/blog/slugify'
import { Todo } from 'app/components/todo'

function Table({ data }) {
  let headers = data.headers.map((header, index) => <th key={index}>{header}</th>)
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props) {
  let href = props.href

  if (href.startsWith('/')) {
    return (
      <Link className='interlink' href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a className='interlink' {...props} />
  }

  return <a className='interlink' target='_blank' rel='noopener noreferrer' {...props} />
}

function RoundedImage(props) {
  return <Image alt={props.alt} className='rounded-lg' {...props} />
}

// Markdown images (`![alt](/file.png)`) carry no dimensions: read them from public/ at build time
function MarkdownImage({ src, alt }) {
  if (typeof src !== 'string' || !src.startsWith('/')) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className='rounded-lg' loading='lazy' />
  }

  let { width, height } = imageSize(fs.readFileSync(path.join(process.cwd(), 'public', src)))

  return (
    <Image
      src={src}
      alt={alt ?? ''}
      width={width}
      height={height}
      sizes='(max-width: 640px) 100vw, 576px'
      className='rounded-lg'
    />
  )
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(textContent(children))
    return React.createElement(`h${level}`, { id: slug }, [
      React.createElement(
        'a',
        {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'no-underline hover:underline'
        },
        children
      )
    ])
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  img: MarkdownImage,
  a: CustomLink,
  code: Code,
  Table,
  Todo: props => <Todo block {...props} />
}

export function CustomMDX(props) {
  return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />
}
