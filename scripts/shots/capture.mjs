import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { mkdir } from 'node:fs/promises'

const dir = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(dir, '../../public/images')
const html = path.join(dir, 'panel.html')

await mkdir(outDir, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ deviceScaleFactor: 2 })

async function shot(name, query, size, selector) {
  await page.setViewportSize(size)
  await page.goto(`file://${html.replace(/\\/g, '/')}?${query}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  const target = selector ? page.locator(selector) : page
  await target.screenshot({
    path: path.join(outDir, name),
    type: 'png',
    omitBackground: Boolean(selector),
  })
}

const sizes = {
  dashboard: { width: 1440, height: 1180 },
  shift: { width: 1440, height: 1100 },
  leave: { width: 1440, height: 1100 },
  timesheet: { width: 1440, height: 980 },
  mobile: { width: 480, height: 920 },
}

for (const lang of ['tr', 'en']) {
  const suffix = lang === 'en' ? '-en' : ''
  await shot(`dashboard${suffix}.png`, `p=dashboard&lang=${lang}`, sizes.dashboard)
  await shot(`shift${suffix}.png`, `p=shift&lang=${lang}`, sizes.shift)
  await shot(`leave${suffix}.png`, `p=leave&lang=${lang}`, sizes.leave)
  await shot(`timesheet${suffix}.png`, `p=timesheet&lang=${lang}`, sizes.timesheet)
  await shot(`app${suffix}.png`, `p=mobile&lang=${lang}`, sizes.mobile, '.phone')
  await shot(`_hero-raw${suffix}.png`, `p=dashboard&lang=${lang}`, sizes.dashboard)
}

await browser.close()
console.log('shots written to', outDir)
