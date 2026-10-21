import Link from 'next/link'

export default function NotFound() {
  return (
    <section>
      <p className='kicker'>Errore 404</p>
      <h1 className='display title mt-4 text-4xl text-ink sm:text-5xl'>Pagina non trovata</h1>
      <p className='mt-6 font-body text-lg text-ink-soft'>
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
