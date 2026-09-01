import { ShieldCheck } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '@/composables/useLocalePath'

export default {
  components: { ShieldCheck },
  setup() {
    const { t } = useI18n()
    const { lp } = useLocalePath()
    return { t, lp }
  },
}
