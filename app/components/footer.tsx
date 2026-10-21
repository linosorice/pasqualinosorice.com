import Link from 'next/link'
import { site } from 'app/config'

const links = [
  { name: 'Email', href: `mailto:${site.email}` },
  { name: 'LinkedIn', href: site.linkedin },
  { name: 'GitHub', href: site.github },
  { name: 'X', href: site.x },
  { name: 'RSS', href: '/rss' }
]

export default function Footer() {
  return (
    <footer className='mt-20 mb-20 border-t border-line pt-8 font-mono text-sm text-muted'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <ul className='flex flex-wrap gap-x-5 gap-y-1'>
          {links.map(({ name, href }) => (
            <li key={name}>
              <a
                className='inline-flex min-h-8 items-center transition-colors hover:text-accent'
                rel='noopener noreferrer'
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                href={href}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
        <p>
          © {new Date().getFullYear()} {site.name}
          {site.vatNumber && <> · P.IVA {site.vatNumber}</>} ·{' '}
          <Link href='/privacy' className='transition-colors hover:text-accent'>
            Privacy
          </Link>
        </p>
      </div>
    </footer>
  )
}
