import { ref } from 'vue'

const show = ref(false)
const message = ref('')
const type = ref('success')

// eslint-disable-next-line import/prefer-default-export
export function useToasty() {
  function showToasty(msg, toastType = 'success') {
    message.value = msg
    type.value = toastType
    show.value = true
  }

  return {
    show,
    message,
    type,
    showToasty,
  }
}
