import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { BlogPosts } from 'app/components/posts'
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

export default function Page() {
  return (
    <section>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <div className='mb-6 flex items-center gap-4'>
        {site.portrait && (
          <Image
            src={site.portrait}
            alt={`Ritratto di ${site.name}`}
            width={56}
            height={56}
            preload
            className='shrink-0 rounded-full object-cover'
          />
        )}
        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
          <span className='font-medium text-neutral-900 dark:text-neutral-100'>{site.name}</span>
          <br />
          CTO di MioAssicuratore
        </p>
      </div>
      <h1 className='title text-2xl font-semibold tracking-tighter sm:text-3xl'>
        Ciao, sono Pasqualino.
      </h1>
      <div className='mt-4 space-y-4 text-lg text-neutral-700 dark:text-neutral-300'>
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

      <div className='mt-8 flex flex-wrap items-center gap-x-4 gap-y-2'>
        <Link
          href='/blog/un-solo-sviluppatore-sviluppo-agentico'
          className='inline-flex items-center rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300'
        >
          Leggi come lavoriamo
        </Link>
        <Link href='/blog' className='interlink text-sm'>
          Tutti gli articoli
        </Link>
      </div>

      <p className='mt-12 text-neutral-700 dark:text-neutral-300'>
        Ogni tanto sperimento anche per conto mio: nel 2024 ho costruito ExaminatorAI, una web app,
        in 12 ore con l’AI, e{' '}
        <Link href='/blog/examinatorai-web-app-in-12-ore' className='interlink'>
          l’ho raccontato qui
        </Link>
        . Fuori dal codice sono un papà felice.
      </p>

      <h2 className='mt-16 mb-4 text-xl font-medium tracking-tight'>Dal blog</h2>
      <BlogPosts limit={5} />

      <ContactNote />
    </section>
  )
}
