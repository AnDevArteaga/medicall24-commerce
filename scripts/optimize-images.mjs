import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const IMG_ROOT = path.resolve('src/assets/img')
const SRC_ROOT = path.resolve('src')
const MIN_BYTES = 100 * 1024
const MAX_WIDTH = 1920
const WEBP_QUALITY = 78

const RASTER_EXT = new Set(['.png', '.jpg', '.jpeg'])

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, files)
    else files.push(full)
  }
  return files
}

function walkSrc(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules') continue
      walkSrc(full, files)
    } else if (/\.(tsx?|jsx?|css)$/.test(entry.name)) {
      files.push(full)
    }
  }
  return files
}

async function convertToWebp(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (!RASTER_EXT.has(ext)) return null

  const stat = fs.statSync(filePath)
  if (stat.size < MIN_BYTES) return null

  const original = stat.size
  const webpPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp')

  if (fs.existsSync(webpPath)) {
    const existing = fs.statSync(webpPath).size
    if (existing < original * 0.95) {
      return {
        file: path.basename(filePath),
        webp: path.basename(webpPath),
        before: original,
        after: existing,
      }
    }
  }

  const buffer = fs.readFileSync(filePath)
  const meta = await sharp(buffer, { failOn: 'none' }).metadata()

  let pipeline = sharp(buffer, { failOn: 'none' }).rotate()
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true })
  }

  const optimized = await pipeline
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toBuffer()

  if (optimized.length >= original * 0.95) return null

  fs.writeFileSync(webpPath, optimized)

  return {
    file: path.basename(filePath),
    webp: path.basename(webpPath),
    before: original,
    after: optimized.length,
  }
}

function updateImports(conversions) {
  // Ordenar por nombre más largo primero para evitar reemplazos parciales
  const sorted = [...conversions].sort(
    (a, b) => b.file.length - a.file.length,
  )

  const srcFiles = walkSrc(SRC_ROOT)
  let updatedFiles = 0

  for (const srcFile of srcFiles) {
    let content = fs.readFileSync(srcFile, 'utf8')
    const original = content

    for (const { file, webp } of sorted) {
      if (!content.includes(file)) continue
      // Solo en rutas de import/url de assets
      content = content.split(`assets/img/${file}`).join(`assets/img/${webp}`)
      content = content.split(`assets/img/${file}`).join(`assets/img/${webp}`)
    }

    if (content !== original) {
      fs.writeFileSync(srcFile, content)
      updatedFiles += 1
    }
  }

  return updatedFiles
}

async function main() {
  if (!fs.existsSync(IMG_ROOT)) {
    console.error('No se encontró', IMG_ROOT)
    process.exit(1)
  }

  const files = walk(IMG_ROOT)
  const conversions = []

  for (const file of files) {
    try {
      const result = await convertToWebp(file)
      if (result) conversions.push(result)
    } catch (err) {
      console.warn('Omitido', path.basename(file), '-', err.message)
    }
  }

  let saved = 0
  for (const r of conversions) {
    saved += r.before - r.after
    console.log(
      `${r.file} → ${r.webp}: ${(r.before / 1024).toFixed(0)}KB → ${(r.after / 1024).toFixed(0)}KB`,
    )
  }

  const updated = updateImports(conversions)

  console.log(
    `\nConvertidas ${conversions.length} imágenes. Ahorro potencial: ${(saved / 1024 / 1024).toFixed(2)} MB`,
  )
  console.log(`Archivos de código actualizados: ${updated}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
