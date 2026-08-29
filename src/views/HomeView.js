import { BarChart3, Bell, CalendarClock, CheckSquare, Layers, LayoutGrid, QrCode, Smartphone, Timer } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import PricingSection from '@/components/PricingSection.vue'
import Reveal from '@/components/Reveal.vue'
import { featureCards, featuredBlocks } from '@/data/features'
import { APP_SIGNIN, APP_SIGNUP, APP_STORE, PLAY_STORE } from '@/utils/links'
import { useSeo } from '@/utils/seo'

export default {
  components: { PricingSection, Reveal },
  setup() {
    const { t } = useI18n()
    useSeo('seo_home_title', 'seo_home_description')

    return {
      t,
      featureCards,
      featuredBlocks,
      icons: { BarChart3, Bell, CalendarClock, CheckSquare, Layers, LayoutGrid, QrCode, Smartphone, Timer },
      steps: [
        { titleKey: 'how_step1_title', descKey: 'how_step1_desc' },
        { titleKey: 'how_step2_title', descKey: 'how_step2_desc' },
        { titleKey: 'how_step3_title', descKey: 'how_step3_desc' },
      ],
      APP_SIGNIN,
      APP_SIGNUP,
      APP_STORE,
      PLAY_STORE,
    }
  },
}
