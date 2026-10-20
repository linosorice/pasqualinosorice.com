import { Metadata } from 'next'
import { ContactCta } from 'app/components/cta'
import { site } from 'app/config'
import { baseUrl } from 'app/sitemap'

const title = 'Consulenza sullo sviluppo agentico'
const description =
  'Audit, affiancamento e workshop per portare lo sviluppo agentico nei team tech: più feature in produzione con la qualità sotto controllo.'
const ogImage = `${baseUrl}/og?title=${encodeURIComponent(title)}`

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    url: `${baseUrl}/consulenza`,
    images: [{ url: ogImage }]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage]
  },
  alternates: {
    canonical: `${baseUrl}/consulenza`
  }
}

const packages = [
  {
    name: 'Audit sviluppo agentico',
    tag: 'Il punto di partenza',
    description:
      'Capiamo dove l’AI può far guadagnare velocità al tuo team senza perdere qualità, e lo mettiamo per iscritto.',
    includes: [
      'Analisi di repository, workflow di sviluppo, CI e strumenti in uso',
      'Interviste brevi con chi sviluppa',
      'Roadmap di adozione con priorità e rischi',
      'Configurazione iniziale pronta: regole di progetto, contesto per gli agenti, controlli in CI'
    ],
    duration: '2-3 settimane',
    price: 'da 3.000 €'
  },
  {
    name: 'Affiancamento mensile',
    tag: 'Per adottare davvero',
    description:
      'Il team lavora con gli agenti sul codice di tutti i giorni e io sono al suo fianco per correggere la rotta.',
    includes: [
      'Call periodiche con il team o con il CTO',
      'Review asincrona di codice, specifiche e workflow',
      'Supporto via chat sui problemi reali',
      'Aggiornamento della configurazione man mano che il team cresce'
    ],
    duration: 'Mensile, disdicibile',
    price: 'da 2.000 € al mese'
  },
  {
    name: 'Workshop per il team',
    tag: 'Per partire in fretta',
    description:
      'Una sessione pratica, sul vostro codice, per passare dall’autocompletamento al lavoro con gli agenti.',
    includes: [
      'Preparazione sul vostro repository',
      'Sessione live da remoto di circa 4 ore',
      'Esercizi su casi reali del team',
      'Materiale e configurazioni da riusare'
    ],
    duration: 'Mezza giornata',
    price: 'da 2.000 €'
  },
  {
    name: 'Prototipo AI',
    tag: 'Anche per aziende senza team tech',
    description:
      'Una prima versione funzionante di una feature o di un prodotto basato sull’AI, per validare l’idea prima di investire.',
    includes: [
      'Definizione del perimetro e dei criteri di successo',
      'Sviluppo del prototipo con aggiornamenti settimanali',
      'Consegna del codice e della documentazione',
      'Indicazioni per portarlo in produzione'
    ],
    duration: '3-5 settimane',
    price: 'da 8.000 €'
  }
]

const steps = [
  {
    title: 'Call conoscitiva',
    text: '30 minuti, gratuita: mi racconti il team, il prodotto e cosa vuoi ottenere.'
  },
  {
    title: 'Proposta',
    text: 'Ti mando una proposta scritta con obiettivi, tempi e prezzo fisso.'
  },
  {
    title: 'Lavoro',
    text: 'Lavoro da remoto, in buona parte in modo asincrono, con momenti di confronto fissati insieme.'
  },
  {
    title: 'Consegna',
    text: 'Ti lascio risultati e configurazioni che il team può mantenere da solo.'
  }
]

const faqs = [
  {
    question: 'Quali strumenti usate?',
    answer:
      'Oggi Claude Code, ma il metodo non dipende da strumento o modello: si applica anche a quello che il tuo team usa già.'
  },
  {
    question: 'Il mio team non usa ancora strumenti AI. Ha senso partire?',
    answer:
      'Sì: l’audit serve proprio a capire da dove cominciare e a evitare gli errori più comuni dei primi mesi.'
  },
  {
    question: 'Lavori anche con aziende senza un team di sviluppo?',
    answer:
      'Sì, con il prototipo AI: costruisco una prima versione funzionante per validare l’idea prima di investire in un team o in un fornitore.'
  },
  {
    question: 'Il nostro codice è riservato.',
    answer:
      'Firmo volentieri un accordo di riservatezza e lavoro con gli accessi minimi necessari, concordati con voi.'
  },
  {
    question: 'Lavori in presenza?',
    answer:
      'No, lavoro solo da remoto. Seguo pochi clienti alla volta, per questo i posti disponibili sono limitati.'
  }
]

export default function Page() {
  return (
    <section>
      <h1 className='title text-3xl font-semibold tracking-tighter'>{title}</h1>
      <p className='mt-4 text-lg text-neutral-700 dark:text-neutral-300'>
        Aiuto CTO e tech lead di startup, scaleup e team di sviluppo a lavorare con gli agenti AI:
        più feature in produzione, con la qualità sotto controllo. Quello che propongo è ciò che
        faccio ogni giorno con il mio team in MioAssicuratore.
      </p>

      <h2 className='mt-12 mb-4 text-xl font-medium tracking-tight'>Pacchetti</h2>
      <div className='space-y-6'>
        {packages.map(({ name, tag, description, includes, duration, price }) => (
          <article
            key={name}
            className='rounded-lg border border-neutral-200 p-6 dark:border-neutral-800'
          >
            <p className='text-sm text-neutral-600 dark:text-neutral-400'>{tag}</p>
            <h3 className='mt-1 text-lg font-medium tracking-tight'>{name}</h3>
            <p className='mt-2 text-neutral-700 dark:text-neutral-300'>{description}</p>
            <ul className='mt-4 list-disc space-y-1 pl-5 text-neutral-700 dark:text-neutral-300'>
              {includes.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <dl className='mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm'>
              <div className='flex gap-1'>
                <dt className='text-neutral-600 dark:text-neutral-400'>Durata:</dt>
                <dd>{duration}</dd>
              </div>
              <div className='flex gap-1'>
                <dt className='text-neutral-600 dark:text-neutral-400'>Prezzo:</dt>
                <dd className='font-medium'>{price}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      {site.launchSlotsLeft > 0 && (
        <aside className='mt-6 rounded-lg bg-neutral-100 p-6 dark:bg-neutral-900'>
          <h3 className='font-medium'>Prezzo di lancio: -40% per i primi 3 clienti</h3>
          <p className='mt-2 text-neutral-700 dark:text-neutral-300'>
            Sto aprendo questa attività e voglio costruire i primi casi studio. Per i primi tre
            clienti ogni pacchetto costa il 40% in meno, in cambio di un caso studio (anche anonimo)
            e di una referenza a fine lavoro.
          </p>
          <p className='mt-2 text-sm font-medium'>
            {site.launchSlotsLeft === 1
              ? 'Resta 1 posto.'
              : `Restano ${site.launchSlotsLeft} posti.`}
          </p>
        </aside>
      )}

      <h2 className='mt-16 mb-4 text-xl font-medium tracking-tight'>Come lavoriamo</h2>
      <ol className='space-y-4'>
        {steps.map(({ title, text }, index) => (
          <li key={title} className='flex gap-4'>
            <span className='text-neutral-500 tabular-nums'>{index + 1}.</span>
            <div>
              <h3 className='font-medium'>{title}</h3>
              <p className='text-neutral-700 dark:text-neutral-300'>{text}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2 className='mt-16 mb-4 text-xl font-medium tracking-tight'>Domande frequenti</h2>
      <div className='space-y-6'>
        {faqs.map(({ question, answer }) => (
          <div key={question}>
            <h3 className='font-medium'>{question}</h3>
            <p className='mt-1 text-neutral-700 dark:text-neutral-300'>{answer}</p>
          </div>
        ))}
      </div>

      <ContactCta
        title='Parliamone'
        text='Prenota una call conoscitiva di 30 minuti: capiamo insieme se e come posso aiutare il tuo team.'
      />
    </section>
  )
}
