export const dynamic = 'force-dynamic'

const headers = {
  'Cache-Control': 'no-store, max-age=0',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Robots-Tag': 'noindex, nofollow',
}

export function GET() {
  return new Response(JSON.stringify({ status: 'ok' }), { headers })
}

export function HEAD() {
  return new Response(null, { headers })
}
