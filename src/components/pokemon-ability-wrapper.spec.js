import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PokemonAbilityWrapper from './PokemonAbilityWrapper.vue'

describe('PokemonAbilityWrapper', () => {
  it('renders ability name correctly', () => {
    const ability = { name: 'swift-swim', is_hidden: false }

    const wrapper = mount(PokemonAbilityWrapper, {
      props: { ability },
    })

    expect(wrapper.text()).toContain('Swift Swim')
  })

  it('shows hidden icon for hidden abilities', () => {
    const ability = { name: 'intimidate', is_hidden: true }

    const wrapper = mount(PokemonAbilityWrapper, {
      props: { ability },
    })

    const img = wrapper.find('img[title="Ability is hidden"]')
    expect(img.exists()).toBe(true)
  })

  it('does not show hidden icon for non-hidden abilities', () => {
    const ability = { name: 'chlorophyll', is_hidden: false }

    const wrapper = mount(PokemonAbilityWrapper, {
      props: { ability },
    })

    const img = wrapper.find('img[title="Ability is hidden"]')
    expect(img.exists()).toBe(false)
  })

  it('applies correct border color for hidden abilities', () => {
    const ability = { name: 'overgrow', is_hidden: true }

    const wrapper = mount(PokemonAbilityWrapper, {
      props: { ability },
    })

    expect(wrapper.classes()).toContain('border-red-400')
  })

  it('applies correct border color for non-hidden abilities', () => {
    const ability = { name: 'blaze', is_hidden: false }

    const wrapper = mount(PokemonAbilityWrapper, {
      props: { ability },
    })

    expect(wrapper.classes()).toContain('border-gray-400')
  })
})
