import { ShieldCheck } from '@lucide/vue'
import { useI18n } from 'vue-i18n'

export default {
  components: { ShieldCheck },
  setup() {
    const { t } = useI18n()
    return { t }
  },
}
