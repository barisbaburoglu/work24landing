import { onMounted, onUnmounted, ref } from 'vue'

export default {
  props: {
    delay: { type: String, default: '0ms' },
  },
  setup() {
    const root = ref(null)
    const visible = ref(false)
    let observer

    onMounted(() => {
      if (typeof IntersectionObserver === 'undefined') {
        visible.value = true
        return
      }
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visible.value = true
            observer.disconnect()
          }
        },
        { threshold: 0.28, rootMargin: '0px 0px -14% 0px' },
      )
      if (root.value) observer.observe(root.value)
    })

    onUnmounted(() => observer?.disconnect())

    return { root, visible }
  },
}
