const canonicalOrigin = process.env.CANONICAL_ORIGIN || 'https://www.tasteofmedina.com'
const apexOrigin = 'https://tasteofmedina.com'
const timeoutMs = 15_000

const requiredSecurityHeaders = [
  'content-security-policy',
  'permissions-policy',
  'referrer-policy',
  'strict-transport-security',
  'x-content-type-options',
  'x-frame-options',
]

async function request(url) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { redirect: 'manual', signal: controller.signal })
  } finally {
    clearTimeout(timeout)
  }
}

async function requireStatus(path, expectedStatus, expectedContentType) {
  const response = await request(`${canonicalOrigin}${path}`)
  const contentType = response.headers.get('content-type') || ''
  if (response.status !== expectedStatus) {
    throw new Error(`${path}: expected ${expectedStatus}, received ${response.status}`)
  }
  if (expectedContentType && !contentType.includes(expectedContentType)) {
    throw new Error(`${path}: expected content type containing ${expectedContentType}, received ${contentType || 'none'}`)
  }
  console.log(`OK ${response.status} ${path}`)
  return response
}

async function requireRedirect(url, expectedLocation) {
  const response = await request(url)
  const location = response.headers.get('location')
  if (![301, 302, 307, 308].includes(response.status)) {
    throw new Error(`${url}: expected redirect, received ${response.status}`)
  }
  if (expectedLocation && location !== expectedLocation) {
    throw new Error(`${url}: expected redirect to ${expectedLocation}, received ${location || 'none'}`)
  }
  console.log(`OK ${response.status} ${url} -> ${location}`)
}

try {
  const homepage = await requireStatus('/', 200, 'text/html')
  for (const header of requiredSecurityHeaders) {
    if (!homepage.headers.get(header)) throw new Error(`/: missing ${header} header`)
  }

  await Promise.all([
    requireStatus('/robots.txt', 200, 'text/plain'),
    requireStatus('/sitemap.xml', 200, 'application/xml'),
    requireStatus('/manifest.webmanifest', 200, 'application/manifest+json'),
    requireStatus('/healthz', 200, 'application/json'),
    requireStatus('/api/health', 200, 'application/json'),
    requireStatus('/privacy', 200, 'text/html'),
    requireStatus('/editorial-standards', 200, 'text/html'),
    requireStatus('/recipes', 200, 'text/html'),
    requireStatus('/categories/street-food', 200, 'text/html'),
    requireStatus('/recipes/1', 200, 'text/html'),
    requireStatus('/opengraph-image', 200, 'image/png'),
    requireStatus('/icons/icon-512.png', 200, 'image/png'),
    requireStatus('/icons/icon-192.png', 200, 'image/png'),
    requireStatus('/icons/apple-touch-icon.png', 200, 'image/png'),
  ])

  await requireRedirect(apexOrigin, `${canonicalOrigin}/`)
  await requireRedirect('http://www.tasteofmedina.com', `${canonicalOrigin}/`)
  await requireRedirect('http://tasteofmedina.com')
  console.log('Production checks passed.')
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}
