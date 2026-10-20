import { site } from 'app/config'
import { Todo } from 'app/components/todo'

export function BookingButton({ children = 'Prenota una call conoscitiva' }) {
  return (
    <a
      href={site.bookingUrl ?? '#'}
      target='_blank'
      rel='noopener noreferrer'
      className='inline-flex items-center rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300'
    >
      {children}
      {!site.bookingUrl && (
        <span className='ml-2'>
          <Todo>link Cal.com</Todo>
        </span>
      )}
    </a>
  )
}

export function ContactCta({
  title = 'Vuoi portare lo sviluppo agentico nel tuo team?',
  text = 'Prenota una call conoscitiva di 30 minuti, gratuita e senza impegno: capiamo insieme da dove partire.'
}) {
  return (
    <aside className='my-12 rounded-lg border border-neutral-200 p-6 dark:border-neutral-800'>
      <h2 className='text-lg font-medium tracking-tight'>{title}</h2>
      <p className='mt-2 text-neutral-700 dark:text-neutral-300'>{text}</p>
      <div className='mt-4 flex flex-wrap items-center gap-x-4 gap-y-2'>
        <BookingButton />
        <a href={`mailto:${site.email}`} className='interlink text-sm'>
          oppure scrivimi a {site.email}
        </a>
      </div>
    </aside>
  )
}
