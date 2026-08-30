import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router/routes'
import { createI18nApp } from './i18n'
import { applyDocumentLocale, persistLocale, SUPPORTED_LOCALES } from './i18n/locale'
import { DEFAULT_LOCALE, sectionIdForPage } from './i18n/paths'
import './styles/main.css'

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ app, router, isClient }) => {
    const i18n = createI18nApp()
    app.use(i18n)

    router.beforeEach((to) => {
      const code = SUPPORTED_LOCALES.includes(to.meta.locale) ? to.meta.locale : DEFAULT_LOCALE
      i18n.global.locale.value = code
      if (isClient) {
        persistLocale(code)
        applyDocumentLocale(code)
      }
    })
  },
)

function scrollBehavior(to, _from, savedPosition) {
  if (savedPosition) return savedPosition
  if (to.hash) {
    return { el: to.hash, behavior: 'smooth', top: 88 }
  }

  const sectionId = sectionIdForPage(to.meta?.page)
  if (to.meta?.homeSection && sectionId && sectionId !== 'home') {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        if (document.getElementById(sectionId)) {
          resolve({ el: `#${sectionId}`, behavior: 'smooth', top: 88 })
        } else {
          resolve({ top: 0 })
        }
      }, 120)
    })
  }

  return { top: 0, left: 0 }
}
