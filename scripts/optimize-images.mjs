import { readdir, rm, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const imageRoot = path.resolve('public/images')
const removePng = process.argv.includes('--remove-png')

async function listPngFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name)
      if (entry.isDirectory()) return listPngFiles(entryPath)
      return entry.name.toLowerCase().endsWith('.png') ? [entryPath] : []
    }),
  )
  return files.flat()
}

async function mapWithConcurrency(values, concurrency, task) {
  const queue = [...values]
  await Promise.all(
    Array.from({ length: Math.min(concurrency, values.length) }, async () => {
      while (queue.length > 0) {
        const value = queue.shift()
        if (value) await task(value)
      }
    }),
  )
}

const sourceFiles = await listPngFiles(imageRoot)
let sourceBytes = 0
let outputBytes = 0

await mapWithConcurrency(sourceFiles, 4, async (input) => {
  const output = input.replace(/\.png$/i, '.webp')
  const [sourceInfo] = await Promise.all([
    stat(input),
    sharp(input).rotate().webp({ effort: 6, quality: 82, smartSubsample: true }).toFile(output),
  ])
  const outputInfo = await stat(output)
  sourceBytes += sourceInfo.size
  outputBytes += outputInfo.size

  if (removePng) await rm(input)
})

const savedPercent = sourceBytes === 0 ? 0 : Math.round((1 - outputBytes / sourceBytes) * 100)
console.log(
  `Optimized ${sourceFiles.length} PNG file(s): ${(sourceBytes / 1024 / 1024).toFixed(1)} MiB → ${(outputBytes / 1024 / 1024).toFixed(1)} MiB (${savedPercent}% smaller).`,
)
if (!removePng) {
  console.log('Source PNGs were retained. Re-run with --remove-png only after visual verification.')
}
