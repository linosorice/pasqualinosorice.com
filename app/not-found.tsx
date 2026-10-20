import Link from 'next/link'

export default function NotFound() {
  return (
    <section>
      <h1 className='mb-8 text-2xl font-semibold tracking-tighter'>404 - Pagina non trovata</h1>
      <p className='mb-4'>La pagina che cerchi non esiste o è stata spostata.</p>
      <p>
        Torna alla{' '}
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
