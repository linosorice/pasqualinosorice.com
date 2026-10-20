import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

export default defineConfig([
  ...nextVitals,
  {
    rules: {
      // Apostrophes and quotes are everywhere in Italian copy and render fine in JSX text
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }]
    }
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', '.private/**'])
])
