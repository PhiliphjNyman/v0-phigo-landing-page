import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'PHIGO – Hemsidor som ger dig fler kunder'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0f1a',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '28px',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 88, fontWeight: 800, letterSpacing: '-3px', color: 'white' }}>
          <span style={{ color: '#10b981' }}>phi</span>
          <span>go</span>
        </div>
        <div
          style={{
            fontSize: 30,
            color: '#9ca3af',
            maxWidth: 680,
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          Hemsidor som ger dig fler kunder
        </div>
        <div
          style={{
            marginTop: '8px',
            fontSize: 22,
            color: '#10b981',
            fontWeight: 600,
          }}
        >
          Fast pris · Klart inom 14 dagar
        </div>
      </div>
    ),
    { ...size }
  )
}
