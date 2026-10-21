// Visual styles under review: each one is a set of tokens in global.css, keyed by `data-style` on <html>.
// Production always renders the default; previews and local builds can switch between them.
export const styles = [
  { id: 'editoriale', name: 'Editoriale' },
  { id: 'tecnico', name: 'Tecnico' },
  { id: 'sobrio', name: 'Sobrio' }
] as const

export type StyleId = (typeof styles)[number]['id']

export const defaultStyle: StyleId = 'editoriale'

export const canSwitchStyle = process.env.VERCEL_ENV !== 'production'

const storageKey = 'stile'

// Runs before the first paint, so a stored or `?stile=` choice doesn't flash the default style
export const styleInitScript = `(function(){try{var ids=${JSON.stringify(styles.map(s => s.id))};var q=new URLSearchParams(location.search).get('stile');if(ids.indexOf(q)>-1)localStorage.setItem('${storageKey}',q);var s=localStorage.getItem('${storageKey}');if(ids.indexOf(s)>-1)document.documentElement.dataset.style=s}catch(e){}})()`

export function saveStyle(id: StyleId) {
  document.documentElement.dataset.style = id
  try {
    localStorage.setItem(storageKey, id)
  } catch {}
}
