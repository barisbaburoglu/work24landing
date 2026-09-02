import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Reveal from './Reveal.vue'
import { APP_SIGNUP, DEMO_SETTINGS_API, PLANS_API } from '@/utils/links'

function textOf(plan, ...keys) {
  for (const key of keys) {
    const value = String(plan?.[key] ?? '').trim()
    if (value) return value
  }
  return ''
}

function localized(plan, locale, enKeys, trKeys, fallbackKeys) {
  const en = textOf(plan, ...enKeys)
  const tr = textOf(plan, ...trKeys)
  const fallback = textOf(plan, ...fallbackKeys)
  return locale === 'en' ? en || fallback || tr : tr || fallback || en
}

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

    const cards = computed(() => {
      const paid = plans.value.filter((plan) => parseFloat(plan?.perPrice ?? plan?.PerPrice || 0) > 0)
      return paid.map((plan, index) => {
        const perPrice = parseFloat(plan.perPrice ?? plan.PerPrice || 0)
        const discountPercent = parseFloat(plan.discountPercent ?? plan.DiscountPercent || 0) || 0
        const discount = Math.max(0, discountPercent) / 100
        const yearlyTotal = userCount.value * perPrice * 12
        const discountedTotal = yearlyTotal * (1 - discount)
        const originalMonthly = yearlyTotal / 12
        const discountedMonthly = discountedTotal / 12
        const start = plan.start ?? plan.Start
        const end = plan.end ?? plan.End
        const range =
          end == null
            ? t('pricing_location_plus', { start })
            : t('pricing_location_range', { start, end })
        const featured = paid.length > 2 ? index === 1 : index === paid.length - 1

        return {
          key: plan.id || index,
          visible: true,
          featured,
          title: localized(
            plan,
            locale.value,
            ['nameEn', 'NameEn'],
            ['nameTr', 'NameTr'],
            ['name', 'Name'],
          ),
          subtitle: localized(
            plan,
            locale.value,
            ['descriptionEn', 'DescriptionEn'],
            ['descriptionTr', 'DescriptionTr'],
            ['description', 'Description'],
          ),
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
      })
    })

    async function fetchPlans() {
      try {
        const response = await fetch(PLANS_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orders: [], filters: [] }),
        })
        if (!response.ok) throw new Error(String(response.status))
        const data = await response.json()
        plans.value = (data.results || []).slice().sort((a, b) => (a.start ?? 0) - (b.start ?? 0))
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
