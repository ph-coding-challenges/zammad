import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PokemonData from './PokemonData.vue'
import PokemonDataWrapper from './PokemonDataWrapper.vue'

describe('PokemonData', () => {
  const mockedData = {
    base_experience: 200,
    height: 70, // 7.0 meters
    weight: 1000, // 100.0 Kg
  }

  it('renders PokemonDataWrapper components with correct props', () => {
    const wrapper = mount(PokemonData, {
      props: { data: mockedData },
    })

    const dataWrappers = wrapper.findAllComponents(PokemonDataWrapper)
    expect(dataWrappers).toHaveLength(3)

    const baseExpWrapper = dataWrappers[0]
    expect(baseExpWrapper.props()).toEqual({
      data: mockedData.base_experience,
      title: 'base exp',
    })

    const heightWrapper = dataWrappers[1]
    expect(heightWrapper.props()).toEqual({
      data: `${mockedData.height / 10}m`,
      title: 'height',
    })

    const weightWrapper = dataWrappers[2]
    expect(weightWrapper.props()).toEqual({
      data: `${mockedData.weight / 10}Kg`,
      title: 'weight',
    })
  })
})
