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

module.exports = {
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
