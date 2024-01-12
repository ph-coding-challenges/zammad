import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PokemonAbilities from './PokemonAbilities.vue'
import Headings from './ui/Headings.vue'
import PokemonAbilityWrapper from './PokemonAbilityWrapper.vue'

const mockedAbilities = [
  { ability: { name: 'chlorophyll' }, is_hidden: false },
  { ability: { name: 'overgrow' }, is_hidden: true },
  { ability: { name: 'blaze' }, is_hidden: false },
  { ability: { name: 'torrent' }, is_hidden: false },
  { ability: { name: 'intimidate' }, is_hidden: true },
]

describe('PokemonAbilities', () => {
  it('renders the Headings component with correct properties', () => {
    const wrapper = mount(PokemonAbilities, {
      props: { abilities: mockedAbilities },
    })

    const headingsComponent = wrapper.findComponent(Headings)
    expect(headingsComponent.exists()).toBe(true)
    expect(headingsComponent.props('size')).toBe('h5')
    expect(headingsComponent.text()).toContain('abilities')
  })

  it('renders the correct number of PokemonAbilityWrapper components', () => {
    const wrapper = mount(PokemonAbilities, {
      props: { abilities: mockedAbilities },
    })

    const abilityWrappers = wrapper.findAllComponents(PokemonAbilityWrapper)
    expect(abilityWrappers).toHaveLength(mockedAbilities.length)
  })

  it.each(mockedAbilities)(
    'renders each PokemonAbilityWrapper with the correct props',
    (ability) => {
      const wrapper = mount(PokemonAbilities, {
        props: { abilities: [ability] },
      })

      const abilityWrapper = wrapper.findComponent(PokemonAbilityWrapper)
      expect(abilityWrapper.exists()).toBe(true)
      expect(abilityWrapper.props('ability')).toEqual({
        name: ability.ability.name,
        is_hidden: ability.is_hidden,
      })
    },
  )
})
