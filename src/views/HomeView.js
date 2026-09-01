import { computed, nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { BarChart3, Bell, CalendarClock, CheckSquare, Layers, LayoutGrid, QrCode, Smartphone, Timer } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import HeroCompliance from '@/components/HeroCompliance.vue'
import PricingSection from '@/components/PricingSection.vue'
import Reveal from '@/components/Reveal.vue'
import ZoomableImage from '@/components/ZoomableImage.vue'
import { featureCards, featuredBlocksFor, shotSrc } from '@/data/features'
import { sectionIdForPage } from '@/i18n/paths'
import { APP_SIGNIN, APP_SIGNUP, APP_STORE, PLAY_STORE } from '@/utils/links'
import { useSeo } from '@/utils/seo'

const SEO_BY_PAGE = {
  home: ['seo_home_title', 'seo_home_description'],
  features: ['seo_features_title', 'seo_features_description'],
  'how-it-works': ['seo_how_title', 'seo_how_description'],
  pricing: ['seo_pricing_title', 'seo_pricing_description'],
}

const HEADER_OFFSET = 88

export default {
  components: { HeroCompliance, PricingSection, Reveal, ZoomableImage },
  setup() {
    const { t, locale } = useI18n()
    const featuredBlocks = computed(() => featuredBlocksFor(locale.value))
    const heroSrc = computed(() => shotSrc('hero', locale.value))
    const appSrc = computed(() => shotSrc('app', locale.value))
    const route = useRoute()
    const titleKey = computed(() => (SEO_BY_PAGE[route.meta?.page] || SEO_BY_PAGE.home)[0])
    const descriptionKey = computed(() => (SEO_BY_PAGE[route.meta?.page] || SEO_BY_PAGE.home)[1])
    useSeo(titleKey, descriptionKey)

    function scrollToSection(page, behavior = 'smooth') {
      if (typeof window === 'undefined') return
      const id = sectionIdForPage(page)
      if (!id) return

      const run = () => {
        if (id === 'home') {
          window.scrollTo({ top: 0, behavior })
          return
        }
        const el = document.getElementById(id)
        if (!el) return
        const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
        window.scrollTo({ top: Math.max(0, top), behavior })
      }

      nextTick(() => {
        requestAnimationFrame(() => {
          run()
          // Layout/fonts can settle a bit later on first paint
          window.setTimeout(run, 50)
        })
      })
    }

    watch(
      () => route.fullPath,
      () => scrollToSection(route.meta?.page),
    )

    onMounted(() => {
      scrollToSection(route.meta?.page, 'auto')
    })

    return {
      t,
      featureCards,
      featuredBlocks,
      heroSrc,
      appSrc,
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
