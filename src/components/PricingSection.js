import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Reveal from './Reveal.vue'
import { APP_SIGNUP, DEMO_SETTINGS_API, PLANS_API } from '@/utils/links'

const PLAN_META = [
  { key: 'starter', titleKey: 'pricing_starter_title', subtitleKey: 'pricing_starter_subtitle' },
  { key: 'team', titleKey: 'pricing_team_title', subtitleKey: 'pricing_team_subtitle', featured: true },
  { key: 'enterprise', titleKey: 'pricing_enterprise_title', subtitleKey: 'pricing_enterprise_subtitle' },
]

export default {
  components: { Reveal },
  setup() {
    const { t, locale } = useI18n()
    const userCount = ref(1)
    const plans = ref([])
    const trialDays = ref(0)
    const sectionRef = ref(null)
    const lit = ref(false)
    let glowObserver

    const trialText = computed(() => {
      if (!trialDays.value) return ''
      return t('pricing_trial', { days: trialDays.value })
    })

    function formatCurrency(amount) {
      return amount.toLocaleString(locale.value === 'en' ? 'en-US' : 'tr-TR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    }

    function normalizeUsers() {
      const value = Number.parseInt(userCount.value, 10)
      userCount.value = Number.isNaN(value) || value < 1 ? 1 : value
    }

    function changeUsers(delta) {
      userCount.value = Math.max(1, (Number.parseInt(userCount.value, 10) || 1) + delta)
    }

    const cards = computed(() =>
      PLAN_META.map((meta, index) => {
        const plan = plans.value[index]
        const perPrice = parseFloat(plan?.perPrice || 0)
        if (!plan || !perPrice) {
          return { ...meta, visible: false, amount: '0', yearly: '', perUser: '', range: '', original: '', discountText: '' }
        }

        const discountPercent = parseFloat(plan.discountPercent || 0) || 0
        const discount = Math.max(0, discountPercent) / 100
        const yearlyTotal = userCount.value * perPrice * 12
        const discountedTotal = yearlyTotal * (1 - discount)
        const originalMonthly = yearlyTotal / 12
        const discountedMonthly = discountedTotal / 12
        const range =
          plan.end == null
            ? t('pricing_location_plus', { start: plan.start })
            : t('pricing_location_range', { start: plan.start, end: plan.end })

        return {
          ...meta,
          visible: true,
          amount: formatCurrency(discountedMonthly),
          original: discount > 0 ? formatCurrency(originalMonthly) : '',
          yearly: `₺ ${formatCurrency(discountedTotal)}${t('pricing_year_suffix')}`,
          perUser: `₺ ${formatCurrency(perPrice)}`,
          range,
          discountText:
            discount > 0
              ? locale.value === 'en'
                ? `-${discountPercent}% OFF`
                : `-%${discountPercent}`
              : '',
        }
      }),
    )

    async function fetchPlans() {
      try {
        const response = await fetch(PLANS_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orders: [], filters: [] }),
        })
        if (!response.ok) throw new Error(String(response.status))
        const data = await response.json()
        const sorted = (data.results || []).slice().sort((a, b) => (a.start ?? 0) - (b.start ?? 0))
        plans.value = PLAN_META.map((_, index) => sorted[index] || sorted[sorted.length - 1] || null)
      } catch {
        plans.value = []
      }
    }

    async function fetchDemoSettings() {
      try {
        const response = await fetch(DEMO_SETTINGS_API)
        if (!response.ok) return
        const data = await response.json()
        const payload = data?.data ?? data
        const enabled = Boolean(payload.isEnabled ?? payload.IsEnabled)
        const days = Number(payload.durationDays ?? payload.DurationDays ?? 0)
        trialDays.value = enabled && days > 0 ? days : 0
      } catch {
        trialDays.value = 0
      }
    }

    onMounted(() => {
      fetchPlans()
      fetchDemoSettings()

      const el = sectionRef.value
      if (!el || typeof IntersectionObserver === 'undefined') {
        lit.value = true
        return
      }

      glowObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            lit.value = true
            glowObserver.disconnect()
          }
        },
        { threshold: 0.24, rootMargin: '0px 0px -12% 0px' },
      )
      glowObserver.observe(el)
    })
    onUnmounted(() => glowObserver?.disconnect())
    watch(locale, () => {})

    return {
      t,
      locale,
      userCount,
      cards,
      APP_SIGNUP,
      trialText,
      changeUsers,
      normalizeUsers,
      sectionRef,
      lit,
    }
  },
}
