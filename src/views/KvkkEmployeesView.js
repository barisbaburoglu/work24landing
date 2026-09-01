import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { kvkkHtml } from '@/data/kvkkHtml'
import { useSeo } from '@/utils/seo'

export default {
  setup() {
    const { t, locale } = useI18n()
    useSeo('seo_kvkk_employees_title', 'seo_kvkk_employees_description')
    const body = computed(() => kvkkHtml.employees[locale.value] || kvkkHtml.employees.tr)
    return { t, body }
  },
}
