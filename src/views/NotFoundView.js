import { useI18n } from 'vue-i18n'
import { useSeo } from '@/utils/seo'

export default {
  setup() {
    const { t } = useI18n()
    useSeo('seo_home_title', 'seo_home_description')
    return { t }
  },
}
