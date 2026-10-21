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

const results = [
  { value: '5-6', label: 'feature in produzione a settimana (prima 1-2 ogni due settimane)' },
  { value: '100%', label: 'del codice scritto da agenti AI' },
  { value: '1', label: 'solo sviluppatore, nemmeno a tempo pieno (prima erano 6)' }
]

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
        Prima eravamo 6 sviluppatori e rilasciavamo 1-2 feature ogni due settimane. Oggi sono
        l’unico sviluppatore e ne rilasciamo 5-6 a settimana.
      </h1>
      <p className='mt-4 text-lg text-neutral-700 dark:text-neutral-300'>
        Ho impostato un sistema di agenti AI che sviluppano al posto di un team di sviluppo. Con me
        il CEO e la product designer portano codice in produzione, con la stessa qualità di prima:
        test, review e collaudo su ogni pull request. Qui racconto come ci siamo arrivati e cosa ho
        imparato.
      </p>

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

      <div className='prose prose-neutral dark:prose-invert mt-12'>
        <p>
          Sono CTO di{' '}
          <a href='https://www.mioassicuratore.it' className='interlink' target='_blank'>
            MioAssicuratore
          </a>{' '}
          da novembre 2020. Abbiamo scelto di restare un team piccolo e di affidare agli agenti AI
          tutta la scrittura del codice: noi decidiamo cosa costruire, guidiamo gli agenti e
          controlliamo la qualità. Le scelte tecniche passano da me, oppure da un agente che
          risponde solo citando decisioni già prese.
        </p>
        <p>
          Ogni feature parte da una issue su GitHub. Un agente ci fa domande finché l’idea non
          diventa un’epica dettagliata e senza punti aperti. A quel punto un agente specializzato la
          sviluppa per deliverable fino alla pull request, con test e review. Tutto finisce su{' '}
          <code>main</code> e i feature flag decidono cosa va in collaudo e cosa in produzione.
        </p>
      </div>

      <dl className='mt-8 grid gap-4 sm:grid-cols-3'>
        {results.map(({ value, label }) => (
          <div
            key={label}
            className='flex flex-col rounded-lg border border-neutral-200 p-4 dark:border-neutral-800'
          >
            <dt className='text-sm text-neutral-600 dark:text-neutral-400'>{label}</dt>
            <dd className='order-first text-2xl font-semibold tracking-tight'>{value}</dd>
          </div>
        ))}
      </dl>

      <h2 className='mt-16 mb-4 text-xl font-medium tracking-tight'>Chi sono</h2>
      <ul className='space-y-4 text-neutral-700 dark:text-neutral-300'>
        <li>
          <strong className='font-medium text-neutral-900 dark:text-neutral-100'>
            CTO di MioAssicuratore
          </strong>{' '}
          dal 2020: sono l’unico sviluppatore di un team di 3 persone che lavora con agenti AI ogni
          giorno.
        </li>
        <li>
          <strong className='font-medium text-neutral-900 dark:text-neutral-100'>
            ExaminatorAI
          </strong>
          : una web app costruita in 12 ore con l’AI, un esperimento del 2024 che{' '}
          <Link href='/blog/examinatorai-web-app-in-12-ore' className='interlink'>
            ho raccontato qui
          </Link>
          .
        </li>
      </ul>
      <p className='mt-6 text-neutral-700 dark:text-neutral-300'>
        Fuori dal codice sono un papà felice.
      </p>

      <h2 className='mt-16 mb-4 text-xl font-medium tracking-tight'>Dal blog</h2>
      <BlogPosts limit={5} />

      <ContactNote />
    </section>
  )
}
