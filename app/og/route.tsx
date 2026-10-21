import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { site } from 'app/config'
import { displayTitle } from 'app/blog/utils'

// Same palette as the dark mode in app/global.css
const colors = {
  paper: '#0a0d0b',
  ink: '#e3e9e5',
  muted: '#84918a',
  line: '#1e2621',
  accent: '#4ade80'
}

const fonts = Promise.all([
  readFile(join(process.cwd(), 'assets/fonts/Geist-SemiBold.ttf')),
  readFile(join(process.cwd(), 'assets/fonts/GeistMono-Regular.ttf'))
])

// Without a title it is the site-wide card, used by the home page
export async function GET(request: Request) {
  let url = new URL(request.url)
  let title =
    url.searchParams.get('title') || 'Racconto come sviluppiamo software con gli agenti AI'
  let [sans, mono] = await fonts

  return new ImageResponse(
    <div
      style={{ background: colors.paper, borderTop: `8px solid ${colors.accent}` }}
      tw='flex h-full w-full flex-col justify-between px-20 py-16'
    >
      <div style={{ fontFamily: 'Geist Mono', color: colors.ink }} tw='flex text-[32px]'>
        <span style={{ color: colors.accent }} tw='mr-4'>
          {'>'}
        </span>
        {site.name}
        <span style={{ color: colors.accent }}>_</span>
      </div>
      <div
        style={{
          fontFamily: 'Geist',
          color: colors.ink,
          lineHeight: 1.1,
          columnGap: '0.26em'
        }}
        tw={title.length > 60 ? 'flex flex-wrap text-[64px]' : 'flex flex-wrap text-[76px]'}
      >
        {/* One element per word and no letter-spacing: otherwise Satori spaces Geist's words unevenly */}
        {displayTitle(title)
          .split(' ')
          .map((word, index) => (
            <span key={index}>{word}</span>
          ))}
      </div>
      <div
        style={{
          fontFamily: 'Geist Mono',
          color: colors.muted,
          borderTop: `1px solid ${colors.line}`
        }}
        tw='flex justify-between pt-8 text-[26px]'
      >
        <span>
          <span tw='mr-3'>{'//'}</span>
          <span style={{ color: colors.accent }}>CTO di MioAssicuratore</span>
        </span>
        <span>pasqualinosorice.com</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Geist', data: sans, weight: 600, style: 'normal' },
        { name: 'Geist Mono', data: mono, weight: 400, style: 'normal' }
      ]
    }
  )
}
