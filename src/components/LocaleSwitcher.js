import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChevronDown } from '@lucide/vue'
import { applyDocumentLocale, persistLocale, SUPPORTED_LOCALES } from '@/i18n/locale'

export default {
  components: { ChevronDown },
  setup() {
    const { t, locale } = useI18n()
    const open = ref(false)

    function choose(code) {
      if (!SUPPORTED_LOCALES.includes(code)) return
      locale.value = code
      persistLocale(code)
      applyDocumentLocale(code)
      open.value = false
    }

    function onDocClick(event) {
      if (!event.target.closest('.locale')) open.value = false
    }

    onMounted(() => document.addEventListener('click', onDocClick))
    onUnmounted(() => document.removeEventListener('click', onDocClick))

    return { t, locale, open, choose }
  },
}
