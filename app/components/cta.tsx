import { site } from 'app/config'

// Low-key invitation to get in touch: the site tells a story, it is not a sales page
export function ContactNote() {
  return (
    <aside className='my-12 border-t border-neutral-200 pt-6 text-neutral-700 dark:border-neutral-800 dark:text-neutral-300'>
      <p>
        Stai lavorando su questi temi? Scrivimi a{' '}
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
