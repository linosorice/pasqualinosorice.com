'use client'

import { useSyncExternalStore } from 'react'
import { defaultStyle, saveStyle, styles, type StyleId } from 'app/design'

// The style lives in <html data-style>, which the init script may have set before hydration
function subscribe(onChange: () => void) {
  let observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributeFilter: ['data-style'] })
  return () => observer.disconnect()
}

function getStyle() {
  return (document.documentElement.dataset.style as StyleId) ?? defaultStyle
}

// Floating picker to compare the styles on previews; never rendered in production
export function StyleSwitcher() {
  let current = useSyncExternalStore(subscribe, getStyle, () => defaultStyle)

  return (
    <div
      role='group'
      aria-label='Stile del sito'
      className='fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-line bg-paper/90 p-1 font-ui text-sm shadow-lg backdrop-blur'
    >
      {styles.map(({ id, name }) => (
        <button
          key={id}
          type='button'
          aria-pressed={current === id}
          onClick={() => saveStyle(id)}
          className='min-h-9 cursor-pointer rounded-full px-3 text-muted transition-colors hover:text-ink aria-pressed:bg-ink aria-pressed:text-paper'
        >
          {name}
        </button>
      ))}
    </div>
  )
}
