// 'unsafe-eval' is only needed by React's dev tooling, never in production
const isDev = process.env.NODE_ENV === 'development'

const cspHeader = `
    default-src 'self';
    script-src 'self' ${isDev ? "'unsafe-eval'" : ''} 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

// Posts removed in the October 2026 relaunch: keep their backlinks working
const removedPosts = [
  'hello-world',
  'the-art-of-crafting-mvp',
  'sentry-backend-monitoring',
  'feature-development-pattern',
  'terraform_opentf_fork',
  'serveless_advantages_use_cases',
  'deep-seek',
  'algorithmic-censorship'
]

module.exports = {
  async redirects() {
    return removedPosts.map(slug => ({
      source: `/blog/${slug}`,
      destination: '/blog',
      permanent: true
    }))
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, '')
          }
        ]
      }
    ]
  }
}
