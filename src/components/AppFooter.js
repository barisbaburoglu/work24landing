import { useI18n } from 'vue-i18n'
import BrandLogo from './BrandLogo.vue'
import { APP_SIGNIN, APP_SIGNUP, CONTACT_EMAIL, CONTACT_PHONE, SOCIAL } from '@/utils/links'

export default {
  components: { BrandLogo },
  setup() {
    const { t } = useI18n()
    const telHref = `tel:${CONTACT_PHONE.replace(/\s/g, '')}`
    return { t, APP_SIGNIN, APP_SIGNUP, CONTACT_EMAIL, CONTACT_PHONE, telHref, SOCIAL }
  },
}
