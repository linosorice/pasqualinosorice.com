import { site } from 'app/config'

// Low-key invitation to get in touch: the site tells a story, it is not a sales page
export function ContactNote() {
  return (
    <aside className='border-line mt-20 border-t pt-10'>
      <p className='display text-ink text-2xl'>Stai lavorando su questi temi?</p>
      <p className='font-body text-ink-soft mt-2 text-lg'>
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
