import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { BlogPosts } from 'app/components/posts'
import { BookingButton, ContactCta } from 'app/components/cta'
import { Todo } from 'app/components/todo'
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
  { value: <Todo>N</Todo>, label: 'rilasci in produzione al mese' },
  { value: <Todo>N%</Todo>, label: 'del codice scritto da agenti AI' },
  { value: <Todo>da N settimane a N giorni</Todo>, label: 'per portare in produzione una feature' }
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

      <div className='flex items-start gap-6'>
        <div>
          <p className='mb-2 text-sm text-neutral-600 dark:text-neutral-400'>
            {site.name} · CTO e consulente di sviluppo agentico
          </p>
          <h1 className='title text-3xl font-semibold tracking-tighter'>
            Il mio team è di 3 sviluppatori e rilascia come uno di <Todo>15</Todo>.
          </h1>
          <p className='mt-4 text-xl tracking-tight text-neutral-700 dark:text-neutral-300'>
            Aiuto il tuo a fare lo stesso.
          </p>
        </div>
        {site.portrait && (
          <Image
            src={site.portrait}
            alt={`Ritratto di ${site.name}`}
            width={112}
            height={112}
            preload
            className='hidden shrink-0 rounded-full object-cover sm:block'
          />
        )}
      </div>

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
          da novembre 2020. Abbiamo scelto di restare un team piccolo e di sfruttare l’AI per
          scrivere codice di qualità a ritmi elevati: oggi mettiamo in produzione nuove feature a
          una velocità che con un team tradizionale richiederebbe molte più persone.
        </p>
        <p>
          Lo sviluppo agentico non è un autocompletamento più furbo. Cambia il modo in cui si
          scrivono specifiche, test e review, e il ruolo di chi sviluppa.{' '}
          <Todo>Una o due frasi su come lavorate concretamente in MioAssicuratore.</Todo>
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
          dal 2020: guido un team di 3 sviluppatori che lavora con agenti AI ogni giorno.
        </li>
        <li>
          <strong className='font-medium text-neutral-900 dark:text-neutral-100'>
            Collaborazione con{' '}
            <a href='https://www.quinck.io' className='interlink' target='_blank'>
              Quinck
            </a>
          </strong>
          , software house di Imola: <Todo>ruolo e cosa fai per loro</Todo>.
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
