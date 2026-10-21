import { site } from 'app/config'

// Low-key invitation to get in touch: the site tells a story, it is not a sales page
export function ContactNote() {
  return (
    <aside className='mt-20 border-t border-line pt-10'>
      <p className='display text-2xl text-ink'>Stai lavorando su questi temi?</p>
      <p className='mt-2 font-body text-lg text-ink-soft'>
        Scrivimi a{' '}
        <a href={`mailto:${site.email}`} className='interlink'>
          {site.email}
        </a>{' '}
        o su{' '}
        <a href={site.linkedin} className='interlink' target='_blank' rel='noopener noreferrer'>
          LinkedIn
        </a>
        : mi fa piacere confrontarmi.
      </p>
    </aside>
  )
}
