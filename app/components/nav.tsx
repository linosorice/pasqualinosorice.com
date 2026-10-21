'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { site } from 'app/config'

const navItems = [{ href: '/blog', name: 'Blog' }]

export function Navbar() {
  let pathname = usePathname()

  return (
    <header className='mb-12 flex items-center justify-between gap-4 py-6 sm:mb-16 sm:py-8'>
      <Link
        href='/'
        className='wordmark display text-xl text-ink transition-colors hover:text-accent'
      >
        {site.name}
      </Link>
      <nav aria-label='Principale' className='font-mono text-sm'>
        <ul className='-mr-3 flex'>
          {navItems.map(({ href, name }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname.startsWith(href) ? 'page' : undefined}
                className='nav-link inline-flex min-h-11 items-center px-3 text-muted transition-colors hover:text-ink aria-[current=page]:text-ink'
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
