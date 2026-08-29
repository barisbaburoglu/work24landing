import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Reveal from '@/components/Reveal.vue'
import { faqIds } from '@/data/faq'
import { useSeo } from '@/utils/seo'

export default {
  components: { Reveal },
  setup() {
    const { t } = useI18n()
    const openId = ref(1)
    useSeo('faq_page_title', 'faq_page_desc')

    function toggle(id) {
      openId.value = openId.value === id ? null : id
    }

    return { t, faqIds, openId, toggle }
  },
}
