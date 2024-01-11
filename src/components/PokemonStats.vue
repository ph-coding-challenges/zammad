<template>
  <Headings size="h2">stats</Headings>
  <PokemonStatWrapper
    v-for="stat in mappedStats"
    v-bind:key="stat.name"
    v-bind:stat="stat"
  />
</template>

<script setup>
import { computed, defineProps } from 'vue'

import Headings from './ui/Headings.vue'
import PokemonStatWrapper from './PokemonStatWrapper.vue'

const props = defineProps({
  stats: Object,
})

const mappedStats = computed(() => {
  const mappedValues = props.stats.map((s) => {
    return { base_stat: s.base_stat, name: s.stat.name }
  })

  const statsSum = mappedValues.reduce((acc, cur) => {
    return acc + cur.base_stat
  }, 0)

  mappedValues.push({
    name: 'total',
    base_stat: statsSum,
  })

  return mappedValues
})
</script>
