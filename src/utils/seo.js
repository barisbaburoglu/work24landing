import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const SITE = 'https://work24.io'

export function useSeo(titleKey, descriptionKey) {
  const { t, locale } = useI18n()
  const route = useRoute()
  const path = route.path === '/' ? '/' : route.path
  const url = `${SITE}${path}`
  const title = computed(() => t(titleKey))
  const description = computed(() => t(descriptionKey))

  useHead({
    title,
    htmlAttrs: {
      lang: locale.value === 'en' ? 'en' : 'tr',
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
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:image', content: `${SITE}/og-favicon.png` },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
    link: [{ rel: 'canonical', href: url }],
  })
}
