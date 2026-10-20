import type { ReactNode } from 'react'

// Highlighted placeholder for copy or numbers still to be provided.
// Production builds fail while any is rendered, so placeholders can't go live by mistake.
export function Todo({ children }: { children: ReactNode }) {
  if (process.env.VERCEL_ENV === 'production') {
    throw new Error(`Placeholder left in a production build: ${String(children)}`)
  }

  return (
    <mark className='rounded bg-amber-200 px-1 text-amber-950 dark:bg-amber-400/30 dark:text-amber-100'>
      {children}
    </mark>
  )
}
