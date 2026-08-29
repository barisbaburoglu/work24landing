export const SUPPORTED_LOCALES = ['tr', 'en']

const STORAGE_KEYS = ['work24_language', 'work24.locale']

export function detectLocale() {
  if (typeof window === 'undefined') return 'tr'

  const fromQuery = new URLSearchParams(window.location.search).get('lang')
  if (SUPPORTED_LOCALES.includes(fromQuery)) return fromQuery

  for (const key of STORAGE_KEYS) {
    const saved = window.localStorage.getItem(key)
    if (SUPPORTED_LOCALES.includes(saved)) return saved
  }

  return 'tr'
}

export function persistLocale(code) {
  if (typeof window === 'undefined') return
  STORAGE_KEYS.forEach((key) => window.localStorage.setItem(key, code))
}

export function applyDocumentLocale(code) {
  if (typeof document === 'undefined') return
  document.documentElement.lang = code === 'en' ? 'en' : 'tr'
}
