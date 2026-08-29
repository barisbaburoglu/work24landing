import { useI18n } from 'vue-i18n'
import Reveal from '@/components/Reveal.vue'
import { CONTACT_EMAIL, CONTACT_FAX, CONTACT_PHONE } from '@/utils/links'
import { useSeo } from '@/utils/seo'

export default {
  components: { Reveal },
  setup() {
    const { t } = useI18n()
    useSeo('seo_contact_title', 'seo_contact_description')
    return {
      t,
      CONTACT_EMAIL,
      CONTACT_FAX,
      CONTACT_PHONE,
      telHref: `tel:${CONTACT_PHONE.replace(/\s/g, '')}`,
    }
  },
}
