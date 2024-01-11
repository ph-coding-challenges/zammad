<template>
  <div
    v-bind:class="`${
      props.stat.name === 'total' ? 'bg-indigo-400' : 'bg-gray-200'
    } font-bold p-2 rounded-full`"
  >
    <div
      v-bind:class="`${
        STATS_DICTIONARY[props.stat.name].color
      } text-white rounded-full w-8 h-8 flex justify-center items-center text-xs mb-2`"
    >
      {{ STATS_DICTIONARY[props.stat.name].name }}
    </div>
    <span>{{ props.stat.base_stat }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  stat: Object,
})

const STATS_DICTIONARY = {
  hp: { name: 'HP', color: 'bg-red-300' },
  attack: { name: 'ATK', color: 'bg-orange-300' },
  defense: { name: 'DEF', color: 'bg-amber-300' },
  'special-attack': { name: 'SpA', color: 'bg-blue-300' },
  'special-defense': { name: 'SpD', color: 'bg-green-300' },
  speed: { name: 'SPD', color: 'bg-pink-300' },
  total: { name: 'TOT', color: 'bg-indigo-300' },
}
</script>
