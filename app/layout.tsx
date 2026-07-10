import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Playfair_Display } from 'next/font/google'
import './theme.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Maghreb Culinary Codex — 120 Authentic Culinary Artifacts',
  description:
    'An editorial index of North African gastronomy: 120 authentic culinary artifacts from the Atlantic Coast to the Red Sea. Street food, tagines & stews, Sephardic traditions, and condiments.',
  generator: 'v0.app',
  keywords: [
    'Moroccan recipes',
    'North African cuisine',
    'tagine',
    'harissa',
    'couscous',
    'Sephardic cooking',
    'Egyptian koshari',
    'Tunisian brik',
  ],
  openGraph: {
    title: 'The Maghreb Culinary Codex',
    description:
      '120 Authentic Culinary Artifacts from the Atlantic Coast to the Red Sea.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#241d12',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
