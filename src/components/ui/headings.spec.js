import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeadingComponent from './Headings.vue'

describe('HeadingComponent', () => {
  const FONT_SIZE_DICTIONARY = {
    h1: 'text-2xl',
    h2: 'text-xl',
    h3: 'text-lg',
    h4: 'text-base',
    h5: 'text-sm',
  }

  it.each(['h1', 'h2', 'h3', 'h4', 'h5'])(
    'renders the correct element and class for size %s',
    (size) => {
      const wrapper = mount(HeadingComponent, {
        props: { size },
        slots: {
          default: 'Test Content',
        },
      })

      const expectedClass = `${FONT_SIZE_DICTIONARY[size]} text-zinc-800 font-bold my-2`
      expect(wrapper.element.tagName.toLowerCase()).toBe(size)
      expect(wrapper.classes()).toContain(expectedClass.split(' ')[0])
    },
  )

  it('renders with default size when no size is provided', () => {
    const wrapper = mount(HeadingComponent, {
      slots: {
        default: 'Default Size Content',
      },
    })

    expect(wrapper.element.tagName.toLowerCase()).toBe('h1')
    expect(wrapper.classes()).toContain('text-2xl')
  })

  it('renders slot content correctly', () => {
    const slotContent = 'Slot Content'
    const wrapper = mount(HeadingComponent, {
      slots: {
        default: slotContent,
      },
    })

    expect(wrapper.text()).toContain(slotContent)
  })
})
