import { onUnmounted, ref, watch } from 'vue'
import { X } from '@lucide/vue'

export default {
  components: { X },
  props: {
    src: { type: String, required: true },
    alt: { type: String, default: '' },
    imgClass: { type: String, default: '' },
    width: { type: [Number, String], default: undefined },
    height: { type: [Number, String], default: undefined },
  },
  setup() {
    const open = ref(false)

    function show() {
      open.value = true
    }

    function hide() {
      open.value = false
    }

    function onKey(event) {
      if (event.key === 'Escape') hide()
    }

    watch(open, (isOpen) => {
      if (typeof document === 'undefined') return
      document.body.classList.toggle('lightbox-open', isOpen)
      if (isOpen) document.addEventListener('keydown', onKey)
      else document.removeEventListener('keydown', onKey)
    })

    onUnmounted(() => {
      if (typeof document === 'undefined') return
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('lightbox-open')
    })

    return { open, show, hide }
  },
}
