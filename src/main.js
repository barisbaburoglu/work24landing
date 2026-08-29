import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router/routes'
import { createI18nApp } from './i18n'
import { applyDocumentLocale } from './i18n/locale'
import './styles/main.css'

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ app, isClient }) => {
    const i18n = createI18nApp()
    app.use(i18n)
    if (isClient) applyDocumentLocale(i18n.global.locale.value)
  },
)

function scrollBehavior(to) {
  if (to.hash) return { el: to.hash, behavior: 'smooth' }
  return { top: 0 }
}
