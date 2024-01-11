<template>
  <Headings size="h5" class="uppercase mt-6">stats</Headings>

  <div class="flex justify-center gap-4">
    <PokemonStatWrapper
      v-for="stat in mappedStats"
      v-bind:key="stat.name"
      v-bind:stat="stat"
    />
  </div>
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
