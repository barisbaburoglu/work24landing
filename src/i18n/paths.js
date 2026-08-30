import { SUPPORTED_LOCALES } from './locale'

export const DEFAULT_LOCALE = 'tr'

/** @type {Record<string, { tr: string, en: string }>} */
export const PAGE_SLUGS = {
  home: { tr: '', en: '' },
  features: { tr: 'ozellikler', en: 'features' },
  'how-it-works': { tr: 'nasil-calisir', en: 'how-it-works' },
  pricing: { tr: 'fiyatlandirma', en: 'pricing' },
  faq: { tr: 'sss', en: 'faq' },
  solutions: { tr: 'cozumler', en: 'solutions' },
  contact: { tr: 'iletisim', en: 'contact' },
  privacy: { tr: 'gizlilik', en: 'privacy' },
  'delete-account': { tr: 'hesap-silme', en: 'delete-account' },
}

/** Home sections share HomeView and scroll to these element ids */
export const HOME_SECTION_IDS = {
  home: 'home',
  features: 'features',
  'how-it-works': 'how-it-works',
  pricing: 'pricing',
}

export const HOME_PAGES = Object.keys(HOME_SECTION_IDS)

export const PAGE_NAMES = Object.keys(PAGE_SLUGS)

const LEGACY_REDIRECTS = {
  '/faq': 'faq',
  '/solutions': 'solutions',
  '/contact': 'contact',
  '/privacy': 'privacy',
  '/delete-account': 'delete-account',
  '/sss': 'faq',
  '/cozumler': 'solutions',
  '/iletisim': 'contact',
  '/gizlilik': 'privacy',
  '/hesap-silme': 'delete-account',
  '/ozellikler': 'features',
  '/features': 'features',
  '/nasil-calisir': 'how-it-works',
  '/how-it-works': 'how-it-works',
  '/fiyatlandirma': 'pricing',
  '/pricing': 'pricing',
}

export function localizedPath(locale, page = 'home') {
  const code = SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE
  const slugs = PAGE_SLUGS[page] || PAGE_SLUGS.home
  const slug = slugs[code] ?? ''
  return slug ? `/${code}/${slug}` : `/${code}`
}

export function alternatePath(page, locale) {
  return localizedPath(locale, page)
}

export function isHomePage(page) {
  return HOME_PAGES.includes(page)
}

export function sectionIdForPage(page) {
  return HOME_SECTION_IDS[page] || null
}

export function legacyRedirectTarget(path) {
  const clean = (path.replace(/\/+$/, '') || '/').split('?')[0]
  if (clean === '/' || clean === '') return localizedPath(DEFAULT_LOCALE, 'home')
  const page = LEGACY_REDIRECTS[clean]
  if (!page) return null
  return localizedPath(DEFAULT_LOCALE, page)
}

export function allLocalizedRoutes() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    PAGE_NAMES.map((page) => localizedPath(locale, page)),
  )
}
