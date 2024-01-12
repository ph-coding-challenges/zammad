import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import ToastyComponent from './Toasty.vue'

const mockShow = ref(false)
const mockMessage = ref('')
const mockType = ref('success')

vi.mock('../../composables/toasty-composable.js', () => ({
  useToasty: () => ({
    show: mockShow,
    message: mockMessage,
    type: mockType,
  }),
}))

vi.useFakeTimers()

describe('ToastyComponent', () => {
  it('renders correctly based on reactive state', async () => {
    mockShow.value = true
    mockMessage.value = 'Test Message'
    mockType.value = 'success'

    const wrapper = mount(ToastyComponent)

    expect(wrapper.isVisible()).toBe(true)
    expect(wrapper.text()).toContain('Test Message')
    expect(wrapper.classes()).toContain('bg-green-500')
  })

  it.each(['success', 'error', 'info', 'warning'])(
    'renders correct style for type %s',
    (type) => {
      mockShow.value = true
      mockType.value = type

      const wrapper = mount(ToastyComponent)
      const TYPE_DICTIONARY = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-amber-500',
      }

      expect(wrapper.classes()).toContain(TYPE_DICTIONARY[type])
    },
  )

  it('does not render when show is false', () => {
    mockShow.value = false

    const wrapper = mount(ToastyComponent)

    expect(wrapper.isVisible()).toBe(false)
  })
})
