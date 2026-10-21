import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { BlogPosts, FeaturedPost } from 'app/components/posts'
import { getBlogPosts } from 'app/blog/utils'
import { ContactNote } from 'app/components/cta'
import { site } from 'app/config'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  alternates: {
    canonical: baseUrl
  }
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  'name': site.name,
  'url': baseUrl,
  'jobTitle': 'CTO',
  'worksFor': {
    '@type': 'Organization',
    'name': 'MioAssicuratore',
    'url': 'https://www.mioassicuratore.it'
  },
  'knowsAbout': ['Sviluppo agentico', 'AI coding', 'Agenti AI', 'Intelligenza artificiale'],
  'sameAs': [site.github, site.x, site.linkedin]
}

// The post that explains the method, highlighted above the others
const featuredSlug = 'un-solo-sviluppatore-sviluppo-agentico'

export default function Page() {
  let featured = getBlogPosts().find(post => post.slug === featuredSlug)

  return (
    <section>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <div className='flex items-center gap-4'>
        {site.portrait && (
          <Image
            src={site.portrait}
            alt={`Ritratto di ${site.name}`}
            width={64}
            height={64}
            preload
            className='shrink-0 rounded-full object-cover'
          />
        )}
        <p className='kicker'>CTO di MioAssicuratore</p>
      </div>
      <h1 className='display title text-ink mt-6 text-4xl leading-[1.05] sm:text-5xl'>
        Ciao, sono Pasqualino.
      </h1>
      <div className='font-body text-ink-soft mt-6 space-y-4 text-lg leading-relaxed sm:text-xl'>
        <p>
          Sono CTO di{' '}
          <a href='https://www.mioassicuratore.it' className='interlink' target='_blank'>
            MioAssicuratore
          </a>{' '}
          dal 2020. Negli ultimi anni ho cambiato completamente il modo in cui sviluppiamo software:
          oggi il codice lo scrivono agenti AI, e noi decidiamo cosa costruire e controlliamo che
          sia fatto bene.
        </p>
        <p>Qui racconto come ci siamo arrivati, cosa funziona e cosa ho imparato strada facendo.</p>
      </div>
      <p className='font-body text-muted mt-6 leading-relaxed'>
        Ogni tanto sperimento anche per conto mio: nel 2024 ho costruito ExaminatorAI, una web app,
        in 12 ore con l’AI, e{' '}
        <Link href='/blog/examinatorai-web-app-in-12-ore' className='interlink'>
          l’ho raccontato qui
        </Link>
        . Fuori dal codice sono un papà felice.
      </p>

      {featured && (
        <div className='mt-14'>
          <FeaturedPost post={featured} />
        </div>
      )}

      <h2 className='kicker mt-16 mb-2'>Dal blog</h2>
      <BlogPosts limit={4} exclude={featuredSlug} heading='h3' />
      <Link
        href='/blog'
        className='font-ui text-muted hover:text-accent mt-4 inline-flex min-h-11 items-center gap-2 text-sm transition-colors'
      >
        Tutti gli articoli <span aria-hidden>→</span>
      </Link>

      <ContactNote />
    </section>
  )
}
