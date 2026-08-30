import { computed, unref } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { alternatePath, DEFAULT_LOCALE } from '@/i18n/paths'
import { SUPPORTED_LOCALES } from '@/i18n/locale'

const SITE = 'https://work24.io'

function absoluteUrl(path) {
  return `${SITE}${path}`
}

export function useSeo(titleKey, descriptionKey) {
  const { t, locale } = useI18n()
  const route = useRoute()
  const page = computed(() => route.meta?.page || 'home')
  const activeLocale = computed(() =>
    SUPPORTED_LOCALES.includes(route.meta?.locale) ? route.meta.locale : locale.value || DEFAULT_LOCALE,
  )
  const path = computed(() => alternatePath(page.value, activeLocale.value))
  const url = computed(() => absoluteUrl(path.value))
  const title = computed(() => t(unref(titleKey)))
  const description = computed(() => t(unref(descriptionKey)))
  const lang = computed(() => (activeLocale.value === 'en' ? 'en' : 'tr'))
  const ogLocale = computed(() => (activeLocale.value === 'en' ? 'en_US' : 'tr_TR'))
  const trUrl = computed(() => absoluteUrl(alternatePath(page.value, 'tr')))
  const enUrl = computed(() => absoluteUrl(alternatePath(page.value, 'en')))
  const defaultUrl = computed(() => absoluteUrl(alternatePath(page.value, DEFAULT_LOCALE)))

  useHead({
    title,
    htmlAttrs: {
      lang,
    },
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: `${SITE}/og-favicon.png` },
      { property: 'og:image:width', content: '512' },
      { property: 'og:image:height', content: '512' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Work24' },
      { property: 'og:locale', content: ogLocale },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:image', content: `${SITE}/og-favicon.png` },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
    link: [
      { rel: 'canonical', href: url },
      { rel: 'alternate', hreflang: 'tr', href: trUrl },
      { rel: 'alternate', hreflang: 'en', href: enUrl },
      { rel: 'alternate', hreflang: 'x-default', href: defaultUrl },
    ],
  })
}
