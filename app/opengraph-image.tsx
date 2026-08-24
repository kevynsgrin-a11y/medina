import { ImageResponse } from 'next/og'

export const alt = 'The Maghreb Culinary Codex'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #241d12 0%, #3f2a1d 55%, #6b2b20 100%)',
          color: '#f6e4a5',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          padding: '72px',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', fontSize: 38, letterSpacing: '0.28em', textTransform: 'uppercase' }}>
          Source-led recipe archive
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontFamily: 'Georgia, serif', fontSize: 98, lineHeight: 1.04 }}>
            The Maghreb
          </div>
          <div style={{ color: '#d8a72c', display: 'flex', fontFamily: 'Georgia, serif', fontSize: 98, fontStyle: 'italic', lineHeight: 1.04 }}>
            Culinary Codex
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 34, lineHeight: 1.3 }}>
          North African and related regional recipe records
        </div>
      </div>
    ),
    size,
  )
}
