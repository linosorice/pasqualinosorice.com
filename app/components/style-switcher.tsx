'use client'

import { useEffect, useState } from 'react'
import { defaultStyle, saveStyle, styles, type StyleId } from 'app/design'

// Floating picker to compare the styles on previews; never rendered in production
export function StyleSwitcher() {
  let [current, setCurrent] = useState<StyleId>(defaultStyle)

  useEffect(() => {
    setCurrent((document.documentElement.dataset.style as StyleId) ?? defaultStyle)
  }, [])

  return (
    <div
      role='group'
      aria-label='Stile del sito'
      className='font-ui border-line bg-paper/90 fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border p-1 text-sm shadow-lg backdrop-blur'
    >
      {styles.map(({ id, name }) => (
        <button
          key={id}
          type='button'
          aria-pressed={current === id}
          onClick={() => {
            saveStyle(id)
            setCurrent(id)
          }}
          className='text-muted hover:text-ink aria-pressed:bg-ink aria-pressed:text-paper min-h-9 cursor-pointer rounded-full px-3 transition-colors'
        >
          {name}
        </button>
      ))}
    </div>
  )
}
