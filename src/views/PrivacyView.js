import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { privacyHtml } from '@/data/privacyHtml'
import { useSeo } from '@/utils/seo'

export default {
  setup() {
    const { t, locale } = useI18n()
    useSeo('seo_privacy_title', 'seo_privacy_description')
    const body = computed(() => privacyHtml[locale.value] || privacyHtml.tr)
    return { t, body }
  },
}
