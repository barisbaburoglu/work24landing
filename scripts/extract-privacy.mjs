import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const html = fs.readFileSync(path.join(root, '_legacy/privacy.html'), 'utf8')
const contentStart = html.indexOf('class="privacy-content"')

function innerLang(lang) {
  const token = `<div data-tr="${lang}"`
  const tagStart = html.indexOf(token, contentStart)
  const openEnd = html.indexOf('>', tagStart)
  let i = openEnd + 1
  let depth = 1
  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf('<div', i)
    const nextClose = html.indexOf('</div>', i)
    if (nextClose === -1) break
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1
      i = nextOpen + 4
    } else {
      depth -= 1
      if (depth === 0) return html.slice(openEnd + 1, nextClose).trim()
      i = nextClose + 6
    }
  }
  throw new Error(`privacy ${lang} not closed`)
}

const privacyHtml = { tr: innerLang('tr'), en: innerLang('en') }
fs.mkdirSync(path.join(root, 'src/data'), { recursive: true })
fs.writeFileSync(
  path.join(root, 'src/data/privacyHtml.js'),
  `export const privacyHtml = {\n  tr: ${JSON.stringify(privacyHtml.tr)},\n  en: ${JSON.stringify(privacyHtml.en)},\n}\n`,
)
console.log('tr chars', privacyHtml.tr.length, 'en chars', privacyHtml.en.length)
