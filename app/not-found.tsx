import Link from 'next/link'

export default function NotFound() {
  return (
    <section>
      <p className='kicker'>Errore 404</p>
      <h1 className='display title text-ink mt-4 text-4xl sm:text-5xl'>Pagina non trovata</h1>
      <p className='font-body text-ink-soft mt-6 text-lg'>
        La pagina che cerchi non esiste o è stata spostata. Torna alla{' '}
        <Link href='/' className='interlink'>
          home
        </Link>{' '}
        o leggi il{' '}
        <Link href='/blog' className='interlink'>
          blog
        </Link>
        .
      </p>
    </section>
  )
}
