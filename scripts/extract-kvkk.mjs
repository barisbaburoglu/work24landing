import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function extractKvkkLang(html, lang) {
  const re = new RegExp(
    `<div data-tr="${lang}"[^>]*>([\\s\\S]*?)</div>\\s*(?:<div data-tr=|</div>\\s*</div>\\s*</div>)`,
  )
  const found = html.match(re)
  if (!found) throw new Error(`kvkk ${lang} not found`)
  return found[1].trim()
}

function extractKvkkFile(filename) {
  const html = fs.readFileSync(path.join(root, 'public', filename), 'utf8')
  return {
    tr: extractKvkkLang(html, 'tr'),
    en: extractKvkkLang(html, 'en'),
  }
}

const kvkkHtml = {
  corporate: extractKvkkFile('kvkk-clarification-notice-corporate.html'),
  employees: extractKvkkFile('kvkk-clarification-notice-employees.html'),
}

const out = path.join(root, 'src/data/kvkkHtml.js')
fs.writeFileSync(
  out,
  `export const kvkkHtml = {\n  corporate: {\n    tr: ${JSON.stringify(kvkkHtml.corporate.tr)},\n    en: ${JSON.stringify(kvkkHtml.corporate.en)},\n  },\n  employees: {\n    tr: ${JSON.stringify(kvkkHtml.employees.tr)},\n    en: ${JSON.stringify(kvkkHtml.employees.en)},\n  },\n}\n`,
)

console.log('extracted kvkk html to', out)
