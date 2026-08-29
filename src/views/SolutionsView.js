import { useI18n } from 'vue-i18n'
import Reveal from '@/components/Reveal.vue'
import { solutionCategories } from '@/data/solutions'
import { useSeo } from '@/utils/seo'

export default {
  components: { Reveal },
  setup() {
    const { t } = useI18n()
    useSeo('solutions_page_title', 'solutions_page_desc')
    return { t, solutionCategories }
  },
}
