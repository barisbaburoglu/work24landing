import { useI18n } from 'vue-i18n'
import { useSeo } from '@/utils/seo'
import { useLocalePath } from '@/composables/useLocalePath'

export default {
  setup() {
    const { t } = useI18n()
    const { lp } = useLocalePath()
    useSeo('seo_home_title', 'seo_home_description')
    return { t, lp }
  },
}
