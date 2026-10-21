'use client'

import { useEffect, useState } from 'react'

type Heading = { level: number; title: string; slug: string }

// Post index: a collapsible block above the text, or a sticky sidebar that follows the reading on wide screens
export function TableOfContents({ headings }: { headings: Heading[] }) {
  let [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    let elements = headings
      .map(({ slug }) => document.getElementById(slug))
      .filter((element): element is HTMLElement => element !== null)
    let frame = 0

    function update() {
      frame = 0
      let current = elements.filter(element => element.getBoundingClientRect().top < 120).pop()
      setActive(current?.id ?? null)
    }

    function onScroll() {
      if (!frame) {
        frame = requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [headings])

  let list = (
    <ol className='space-y-2'>
      {headings.map(({ level, title, slug }) => (
        <li key={slug} style={{ paddingLeft: `${(level - 1) * 0.875}rem` }}>
          <a
            href={`#${slug}`}
            aria-current={active === slug ? 'location' : undefined}
            className='text-muted hover:text-ink aria-[current=location]:text-accent block transition-colors'
          >
            {title}
          </a>
        </li>
      ))}
    </ol>
  )

  return (
    <>
      <details className='group font-ui border-line bg-surface rounded-card mb-10 border text-sm xl:hidden'>
        <summary className='text-ink flex min-h-12 cursor-pointer list-none items-center px-5 font-medium [&::-webkit-details-marker]:hidden'>
          Indice · {headings.length} sezioni
          <span
            aria-hidden
            className='text-muted ml-auto text-lg transition-transform group-open:rotate-45 motion-reduce:transition-none'
          >
            +
          </span>
        </summary>
        <nav aria-label='Indice' className='px-5 pb-5'>
          {list}
        </nav>
      </details>
      <aside className='absolute inset-y-0 left-full ml-12 hidden w-56 xl:block'>
        <nav aria-label='Indice' className='font-ui sticky top-10 text-[0.8125rem] leading-snug'>
          <p className='kicker mb-4'>Indice</p>
          {list}
        </nav>
      </aside>
    </>
  )
}
