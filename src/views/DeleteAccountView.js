import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { CONTACT_EMAIL } from '@/utils/links'
import { useSeo } from '@/utils/seo'
import { useLocalePath } from '@/composables/useLocalePath'

export default {
  setup() {
    const { t, locale } = useI18n()
    const { lp } = useLocalePath()
    useSeo('seo_delete_title', 'seo_delete_description')
    const mailHref = computed(() =>
      locale.value === 'en'
        ? `mailto:${CONTACT_EMAIL}?subject=Account%20Deletion%20Request&body=Hello%2C%20I%20would%20like%20to%20delete%20my%20account.`
        : `mailto:${CONTACT_EMAIL}?subject=Hesap%20Silme%20Talebi&body=Merhaba%2C%20hesab%C4%B1m%C4%B1n%20silinmesini%20istiyorum.`,
    )
    return { t, lp, CONTACT_EMAIL, mailHref }
  },
}
