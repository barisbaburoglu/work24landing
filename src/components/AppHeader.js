import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Menu, X } from '@lucide/vue'
import BrandLogo from './BrandLogo.vue'
import LocaleSwitcher from './LocaleSwitcher.vue'
import { APP_SIGNIN, APP_SIGNUP } from '@/utils/links'

export default {
  components: { BrandLogo, LocaleSwitcher, Menu, X },
  setup() {
    const { t } = useI18n()
    const scrolled = ref(false)
    const menuOpen = ref(false)
    const supportOpen = ref(false)

    function openMenu() {
      menuOpen.value = true
    }

    function closeMenu() {
      menuOpen.value = false
    }

    function onScroll() {
      scrolled.value = window.scrollY > 12
    }

    function onDocClick(event) {
      if (!event.target.closest('.nav-more')) supportOpen.value = false
    }

    function onKeydown(event) {
      if (event.key === 'Escape') closeMenu()
    }

    watch(menuOpen, (open) => {
      if (typeof document === 'undefined') return
      document.body.classList.toggle('drawer-open', open)
    })

    onMounted(() => {
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      document.addEventListener('click', onDocClick)
      document.addEventListener('keydown', onKeydown)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKeydown)
      document.body.classList.remove('drawer-open')
    })

    return { t, scrolled, menuOpen, supportOpen, APP_SIGNIN, APP_SIGNUP, openMenu, closeMenu }
  },
}
