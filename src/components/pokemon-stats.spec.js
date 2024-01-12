import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PokemonStats from './PokemonStats.vue'
import Headings from './ui/Headings.vue'
import PokemonStatWrapper from './PokemonStatWrapper.vue'

describe('PokemonStats', () => {
  it('renders headings and stat wrappers correctly', () => {
    const stats = [
      { base_stat: 65, stat: { name: 'hp' } },
      { base_stat: 80, stat: { name: 'attack' } },
      { base_stat: 75, stat: { name: 'defense' } },
      { base_stat: 90, stat: { name: 'special-attack' } },
      { base_stat: 85, stat: { name: 'special-defense' } },
      { base_stat: 70, stat: { name: 'speed' } },
    ]

    const wrapper = mount(PokemonStats, {
      props: { stats },
      global: {
        stubs: {
          Headings,
          PokemonStatWrapper,
        },
      },
    })

    const headingsComponent = wrapper.findComponent(Headings)
    expect(headingsComponent.exists()).toBe(true)
    expect(headingsComponent.props('size')).toBe('h5')

    const statWrappers = wrapper.findAllComponents(PokemonStatWrapper)
    expect(statWrappers).toHaveLength(stats.length + 1) // +1 for total stat

    stats.forEach((stat, index) => {
      const wrapperProps = statWrappers.at(index).props('stat')
      expect(wrapperProps.name).toBe(stat.stat.name)
      expect(wrapperProps.base_stat).toBe(stat.base_stat)
    })

    const totalStatWrapper = statWrappers.at(stats.length)
    expect(totalStatWrapper.props('stat').name).toBe('total')
    const totalStatValue = stats.reduce((acc, cur) => acc + cur.base_stat, 0)
    expect(totalStatWrapper.props('stat').base_stat).toBe(totalStatValue)
  })
})
