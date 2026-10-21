import Link from 'next/link'
import { site } from 'app/config'

function ArrowIcon() {
  return (
    <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z'
        fill='currentColor'
      />
    </svg>
  )
}

const links = [
  { name: 'email', href: `mailto:${site.email}` },
  { name: 'linkedin', href: site.linkedin },
  { name: 'github', href: site.github },
  { name: 'X', href: site.x },
  { name: 'rss', href: '/rss' }
]

export default function Footer() {
  return (
    <footer className='mb-16'>
      <ul className='font-sm text-muted mt-8 flex flex-col space-y-2 space-x-0 md:flex-row md:space-y-0 md:space-x-4'>
        {links.map(({ name, href }) => (
          <li key={name}>
            <a
              className='hover:text-ink flex items-center transition-all'
              rel='noopener noreferrer'
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              href={href}
            >
              <ArrowIcon />
              <p className='ml-2 h-7'>{name}</p>
            </a>
          </li>
        ))}
      </ul>
      <p className='text-muted mt-8 text-sm'>
        © {new Date().getFullYear()} {site.name}
        {site.vatNumber && <> · P.IVA {site.vatNumber}</>} ·{' '}
        <Link href='/privacy' className='hover:text-ink'>
          Privacy
        </Link>
      </p>
    </footer>
  )
}
