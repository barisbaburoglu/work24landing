import { onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
  components: { AppHeader, AppFooter },
  setup() {
    onMounted(() => {
      document.documentElement.classList.add('js-ready')
    })
  },
}
