import { useI18n } from 'vue-i18n'
import BrandLogo from './BrandLogo.vue'
import { APP_SIGNIN, APP_SIGNUP, CONTACT_EMAIL, CONTACT_PHONE, SOCIAL } from '@/utils/links'
import { useLocalePath } from '@/composables/useLocalePath'

export default {
  components: { BrandLogo },
  setup() {
    const { t } = useI18n()
    const { lp } = useLocalePath()
    const telHref = `tel:${CONTACT_PHONE.replace(/\s/g, '')}`
    return { t, lp, APP_SIGNIN, APP_SIGNUP, CONTACT_EMAIL, CONTACT_PHONE, telHref, SOCIAL }
  },
}
