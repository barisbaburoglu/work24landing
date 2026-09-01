import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { kvkkHtml } from '@/data/kvkkHtml'
import { useSeo } from '@/utils/seo'

export default {
  setup() {
    const { t, locale } = useI18n()
    useSeo('seo_kvkk_corporate_title', 'seo_kvkk_corporate_description')
    const body = computed(() => kvkkHtml.corporate[locale.value] || kvkkHtml.corporate.tr)
    return { t, body }
  },
}
