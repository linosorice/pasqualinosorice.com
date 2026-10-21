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
    <footer className='font-ui border-line text-muted mt-20 mb-20 border-t pt-8 text-sm'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <ul className='flex flex-wrap gap-x-5 gap-y-1'>
          {links.map(({ name, href }) => (
            <li key={name}>
              <a
                className='hover:text-accent inline-flex min-h-8 items-center transition-colors'
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
          <Link href='/privacy' className='hover:text-accent transition-colors'>
            Privacy
          </Link>
        </p>
      </div>
    </footer>
  )
}
