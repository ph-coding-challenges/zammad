import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PokemonStatWrapper from './PokemonStatWrapper.vue'

describe('PokemonStatWrapper', () => {
  const STATS_DICTIONARY = {
    hp: { name: 'HP', color: 'bg-red-300' },
    attack: { name: 'ATK', color: 'bg-orange-300' },
    defense: { name: 'DEF', color: 'bg-amber-300' },
    'special-attack': { name: 'SpA', color: 'bg-blue-300' },
    'special-defense': { name: 'SpD', color: 'bg-green-300' },
    speed: { name: 'SPD', color: 'bg-pink-300' },
    total: { name: 'TOT', color: 'bg-indigo-300' },
  }

  Object.entries(STATS_DICTIONARY).forEach(([key, value]) => {
    it(`renders correctly for stat type ${key}`, () => {
      const wrapper = mount(PokemonStatWrapper, {
        props: {
          stat: { name: key, base_stat: 100 },
        },
      })

      expect(wrapper.find(`.${value.color}`).exists()).toBe(true)
      expect(wrapper.text()).toContain(value.name)
      expect(wrapper.text()).toContain('100')
    })
  })

  it('applies correct background for total stat', () => {
    const wrapper = mount(PokemonStatWrapper, {
      props: {
        stat: { name: 'total', base_stat: 100 },
      },
    })

    expect(wrapper.classes()).toContain('bg-indigo-400')
  })

  it('applies default background for non-total stat', () => {
    const wrapper = mount(PokemonStatWrapper, {
      props: {
        stat: { name: 'hp', base_stat: 100 },
      },
    })

    expect(wrapper.classes()).toContain('bg-gray-200')
  })
})
