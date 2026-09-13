import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DEMO_SETTINGS_API } from '@/utils/links'

const trialDays = ref(0)
let loadPromise = null

async function loadDemoSettings() {
  if (loadPromise) return loadPromise

  loadPromise = (async () => {
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
  })()

  return loadPromise
}

export function useDemoSettings() {
  const { t } = useI18n()

  onMounted(() => {
    loadDemoSettings()
  })

  const hasTrial = computed(() => trialDays.value > 0)
  const trialText = computed(() =>
    hasTrial.value ? t('pricing_trial', { days: trialDays.value }) : '',
  )
  const trialCta = computed(() =>
    hasTrial.value ? t('hero_trial_cta', { days: trialDays.value }) : t('get_started'),
  )

  return { trialDays, hasTrial, trialText, trialCta }
}
