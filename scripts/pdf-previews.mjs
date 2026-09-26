#!/usr/bin/env node
// Renders the PDF previews the site shows, with Ghostscript. Run
// `npm run previews` after adding, replacing or removing any of these PDFs.
//
// RL cheat sheets (/posts/rl-cheat-sheet):
//   Every PDF in public/rl-cheatsheet/ gets its first page rendered to
//   previews/<id>.jpg and an entry in data/rl-cheatsheet.json. Edit its title,
//   subtitle and description there (they are kept on later runs); the JSON's
//   order is the gallery's order.
//
// Publications (home page):
//   Each pdfUrl in data/publications.json gets small thumbnails of its first
//   three pages, public/previews/<name>-1.jpg to -3.jpg.
//
// Ghostscript renders fonts that pdf.js and Chrome's viewer get wrong, so the
// previews stay right even for oddly re-encoded PDFs.
// Needs Ghostscript: `brew install ghostscript`, or set GS_PATH.

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sheetDir = path.join(root, 'public', 'rl-cheatsheet')
const sheetPreviewDir = path.join(sheetDir, 'previews')
const sheetManifestPath = path.join(root, 'data', 'rl-cheatsheet.json')
const publicationsPath = path.join(root, 'data', 'publications.json')
const pubPreviewDir = path.join(root, 'public', 'previews')
const GS = process.env.GS_PATH || 'gs'
const force = process.argv.includes('--force')

const ACRONYMS = new Set(['rl', 'ppo', 'trpo', 'dqn', 'ddpg', 'td3', 'sac', 'a2c', 'a3c', 'grpo', 'dpo', 'rlhf', 'rlvr', 'llm', 'gae', 'kl', 'mdp', 'td', 'mcts', 'vla', 'reinforce', 'rloo'])

// "ppo_cheat_sheet_robotics_llm" -> "PPO Robotics LLM"
function titleFromId(id) {
  return id
    .replace(/cheat[-_ ]?sheet/gi, ' ')
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => (ACRONYMS.has(w.toLowerCase()) ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(' ')
}

function gs(args) {
  return execFileSync(GS, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
}

function pageCount(pdf) {
  const psPath = pdf.replace(/[()\\]/g, '\\$&')
  const out = gs(['-q', '-dNODISPLAY', '-dNOSAFER', '-dBATCH', `--permit-file-read=${pdf}`, '-c', `(${psPath}) (r) file runpdfbegin pdfpagecount = quit`])
  return Number.parseInt(out.trim(), 10) || undefined
}

// Pages first..last as JPEGs; `out` may contain %d for the page number.
function renderPages(pdf, out, { first, last, dpi, quality }) {
  gs(['-q', '-dSAFER', '-dBATCH', '-dNOPAUSE', '-sDEVICE=jpeg', `-dJPEGQ=${quality}`, `-r${dpi}`, '-dTextAlphaBits=4', '-dGraphicsAlphaBits=4', `-dFirstPage=${first}`, `-dLastPage=${last}`, `-sOutputFile=${out}`, pdf])
}

const isStale = (output, source) => force || !fs.existsSync(output) || fs.statSync(output).mtimeMs < fs.statSync(source).mtimeMs

function removeUnexpected(dir, expected, label) {
  for (const file of fs.readdirSync(dir)) {
    if (!expected.has(file)) {
      fs.rmSync(path.join(dir, file))
      console.log(`- ${label}/${file}`)
    }
  }
}

function syncCheatSheets() {
  const pdfs = fs.existsSync(sheetDir) ? fs.readdirSync(sheetDir).filter((f) => /\.pdf$/i.test(f)).sort() : []
  const previous = fs.existsSync(sheetManifestPath) ? JSON.parse(fs.readFileSync(sheetManifestPath, 'utf8')) : []
  fs.mkdirSync(sheetPreviewDir, { recursive: true })

  // Known sheets keep their manifest order and text; new PDFs go at the end.
  const entries = previous.filter((e) => pdfs.includes(e.file))
  for (const e of previous) if (!pdfs.includes(e.file)) console.log(`- ${e.file}: PDF is gone, dropped from the manifest`)
  for (const file of pdfs) {
    if (entries.some((e) => e.file === file)) continue
    const id = file.replace(/\.pdf$/i, '')
    entries.push({ id, file, title: titleFromId(id), subtitle: '', description: '' })
    console.log(`+ ${file}: added as "${titleFromId(id)}"; edit its text in data/rl-cheatsheet.json`)
  }

  for (const entry of entries) {
    const pdf = path.join(sheetDir, entry.file)
    const preview = path.join(sheetPreviewDir, `${entry.id}.jpg`)
    if (isStale(preview, pdf)) {
      // About 1400px wide for a landscape letter page.
      renderPages(pdf, preview, { first: 1, last: 1, dpi: 96, quality: 85 })
      console.log(`✓ rl-cheatsheet/previews/${entry.id}.jpg`)
    }
    entry.pages = pageCount(pdf)
  }
  removeUnexpected(sheetPreviewDir, new Set(entries.map((e) => `${e.id}.jpg`)), 'rl-cheatsheet/previews')

  fs.writeFileSync(sheetManifestPath, JSON.stringify(entries, null, 2) + '\n')
  console.log(`✓ data/rl-cheatsheet.json (${entries.length} sheet${entries.length === 1 ? '' : 's'})`)
}

function syncPublications() {
  if (!fs.existsSync(publicationsPath)) return
  const publications = JSON.parse(fs.readFileSync(publicationsPath, 'utf8'))
  fs.mkdirSync(pubPreviewDir, { recursive: true })
  const expected = new Set()
  for (const { pdfUrl } of publications) {
    const pdf = path.join(root, 'public', pdfUrl)
    if (!fs.existsSync(pdf)) {
      console.warn(`! ${pdfUrl}: listed in data/publications.json but not in public/`)
      continue
    }
    const name = path.basename(pdf, path.extname(pdf))
    const pages = Math.min(3, pageCount(pdf) ?? 3)
    const outputs = Array.from({ length: pages }, (_, i) => `${name}-${i + 1}.jpg`)
    outputs.forEach((file) => expected.add(file))
    if (outputs.some((file) => isStale(path.join(pubPreviewDir, file), pdf))) {
      // Small thumbnails: about 400px wide for a portrait letter page.
      renderPages(pdf, path.join(pubPreviewDir, `${name}-%d.jpg`), { first: 1, last: pages, dpi: 48, quality: 82 })
      console.log(`✓ previews/${name}-1..${pages}.jpg`)
    }
  }
  removeUnexpected(pubPreviewDir, expected, 'previews')
}

try {
  syncCheatSheets()
  syncPublications()
} catch (err) {
  if (err.code === 'ENOENT') console.error(`✗ Ghostscript not found ("${GS}"). Install it with \`brew install ghostscript\` or set GS_PATH.`)
  else console.error(`✗ ${err.stderr || err.message}`)
  process.exit(1)
}
