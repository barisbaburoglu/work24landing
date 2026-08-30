import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { DEFAULT_LOCALE, localizedPath } from '@/i18n/paths'
import { SUPPORTED_LOCALES } from '@/i18n/locale'

export function useLocalePath() {
  const route = useRoute()
  const { locale } = useI18n()

  const activeLocale = computed(() => {
    const fromRoute = route.meta?.locale
    if (SUPPORTED_LOCALES.includes(fromRoute)) return fromRoute
    if (SUPPORTED_LOCALES.includes(locale.value)) return locale.value
    return DEFAULT_LOCALE
  })

  const currentPage = computed(() => route.meta?.page || 'home')

  function lp(page = 'home') {
    return localizedPath(activeLocale.value, page)
  }

  function switchLocale(code) {
    return localizedPath(code, currentPage.value)
  }

  return { lp, switchLocale, activeLocale, currentPage }
}
