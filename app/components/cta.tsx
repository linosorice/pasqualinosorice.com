import { site } from 'app/config'

// Low-key invitation to get in touch: the site tells a story, it is not a sales page
export function ContactNote() {
  return (
    <aside className='border-line text-ink-soft my-12 border-t pt-6'>
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
