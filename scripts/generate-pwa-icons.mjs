import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const outputDirectory = path.resolve('public/icons')

function iconSvg(size) {
  const stroke = Math.round(size * 0.07)
  const outer = Math.round(size * 0.35)
  const start = Math.round(size * 0.3)
  const end = Math.round(size * 0.7)
  const center = size / 2

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" fill="#241d12"/>
      <circle cx="${center}" cy="${center}" r="${outer}" fill="none" stroke="#d8a72c" stroke-width="${stroke}"/>
      <g fill="none" stroke="#f6e4a5" stroke-linecap="round" stroke-width="${stroke}">
        <path d="M${center} ${start}V${end}M${start} ${center}H${end}"/>
        <path d="M${start + stroke} ${start + stroke}L${end - stroke} ${end - stroke}M${end - stroke} ${start + stroke}L${start + stroke} ${end - stroke}"/>
      </g>
    </svg>`
}

await mkdir(outputDirectory, { recursive: true })
await Promise.all([
  sharp(Buffer.from(iconSvg(192))).png().toFile(path.join(outputDirectory, 'icon-192.png')),
  sharp(Buffer.from(iconSvg(512))).png().toFile(path.join(outputDirectory, 'icon-512.png')),
  sharp(Buffer.from(iconSvg(180))).png().toFile(path.join(outputDirectory, 'apple-touch-icon.png')),
])

console.log('Generated 192px, 512px, and Apple touch PWA icons.')
