import type { ReactNode } from 'react'

// Highlighted placeholder for copy or numbers still to be provided.
// Production builds fail while any is rendered, so placeholders can't go live by mistake.
// `block` is for placeholders on their own line in MDX, whose children are wrapped in a paragraph.
export function Todo({ children, block = false }: { children: ReactNode; block?: boolean }) {
  if (process.env.VERCEL_ENV === 'production') {
    throw new Error(`Placeholder left in a production build: ${String(children)}`)
  }

  if (block) {
    return (
      <div className='my-4 rounded-lg bg-amber-200 px-4 text-amber-950 dark:bg-amber-400/30 dark:text-amber-100 [&_p]:text-inherit'>
        {children}
      </div>
    )
  }

  return (
    <mark className='rounded bg-amber-200 px-1 text-amber-950 dark:bg-amber-400/30 dark:text-amber-100'>
      {children}
    </mark>
  )
}
