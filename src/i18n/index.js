import { createI18n } from 'vue-i18n'
import tr from './locales/tr.json'
import en from './locales/en.json'
import { applyDocumentLocale, detectLocale, persistLocale, SUPPORTED_LOCALES } from './locale'

export { SUPPORTED_LOCALES }

export function createI18nApp() {
  return createI18n({
    legacy: false,
    globalInjection: true,
    locale: detectLocale(),
    fallbackLocale: 'en',
    messages: { tr, en },
    missingWarn: false,
    fallbackWarn: false,
  })
}

export function setAppLocale(i18n, code) {
  if (!SUPPORTED_LOCALES.includes(code)) return
  i18n.global.locale.value = code
  persistLocale(code)
  applyDocumentLocale(code)
}
