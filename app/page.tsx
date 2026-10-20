import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { BlogPosts } from 'app/components/posts'
import { BookingButton, ContactCta } from 'app/components/cta'
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
  'jobTitle': 'CTO e consulente di sviluppo agentico',
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

const services = [
  {
    title: 'Audit sviluppo agentico',
    description:
      'Analizzo codice, workflow e strumenti del tuo team e ti consegno una roadmap concreta, con la configurazione iniziale già pronta.'
  },
  {
    title: 'Affiancamento mensile',
    description:
      'Accompagno il team mentre adotta gli agenti: review, call periodiche e supporto sui problemi reali.'
  },
  {
    title: 'Workshop per il team',
    description:
      'Una sessione pratica sul vostro codice per passare dall’autocompletamento al lavoro con gli agenti.'
  }
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
          CTO e consulente di sviluppo agentico
        </p>
      </div>
      <h1 className='title text-2xl font-semibold tracking-tighter sm:text-3xl'>
        Prima eravamo 6 sviluppatori e rilasciavamo 1-2 feature ogni due settimane. Oggi sono
        l’unico sviluppatore e ne rilasciamo 5-6 a settimana.
      </h1>
      <p className='mt-4 text-lg text-neutral-700 dark:text-neutral-300'>
        Con me il CEO e la product designer portano codice in produzione grazie agli agenti AI, con
        la stessa qualità di prima: test, review e collaudo su ogni pull request. Aiuto il tuo team
        a fare lo stesso.
      </p>

      <div className='mt-8 flex flex-wrap items-center gap-x-4 gap-y-2'>
        <BookingButton />
        <Link href='/consulenza' className='interlink text-sm'>
          Scopri come lavoro
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

      <h2 className='mt-16 mb-4 text-xl font-medium tracking-tight'>Come posso aiutarti</h2>
      <div className='space-y-6'>
        {services.map(({ title, description }) => (
          <div key={title}>
            <h3 className='font-medium'>{title}</h3>
            <p className='mt-1 text-neutral-700 dark:text-neutral-300'>{description}</p>
          </div>
        ))}
      </div>
      <p className='mt-6'>
        <Link href='/consulenza' className='interlink'>
          Pacchetti, prezzi e modalità di lavoro
        </Link>
      </p>

      <h2 className='mt-16 mb-4 text-xl font-medium tracking-tight'>Esperienza</h2>
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
            Collaborazione con{' '}
            <a href='https://www.quinck.io' className='interlink' target='_blank'>
              Quinck
            </a>
          </strong>
          , software house di Imola: sviluppo applicazioni per i loro clienti, dall’analisi dei
          requisiti al supporto dopo il rilascio, con lo stesso metodo agentico.
        </li>
        <li>
          <strong className='font-medium text-neutral-900 dark:text-neutral-100'>
            ExaminatorAI
          </strong>
          : una web app costruita in 12 ore con l’AI, un esperimento del 2024 che{' '}
          <Link href='/blog/examinatorai' className='interlink'>
            ho raccontato qui
          </Link>
          .
        </li>
      </ul>
      <p className='mt-6 text-neutral-700 dark:text-neutral-300'>
        Fuori dal codice sono un papà felice.
      </p>

      <ContactCta />

      <h2 className='mb-4 text-xl font-medium tracking-tight'>Dal blog</h2>
      <BlogPosts limit={5} />
    </section>
  )
}
