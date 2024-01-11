<template>
  <div class="flex justify-center wrap gap-2 mt-4">
    <PokemonDataWrapper
      v-bind:data="pokemonInfo.base_experience"
      title="base exp"
    />

    <PokemonDataWrapper v-bind:data="pokemonInfo.height" title="height" />
    <PokemonDataWrapper v-bind:data="pokemonInfo.weight" title="weight" />
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'

import PokemonDataWrapper from './PokemonDataWrapper.vue'

const props = defineProps({
  data: Object,
})

const pokemonInfo = computed(() => {
  return {
    base_experience: props.data?.base_experience,
    height: props.data?.height ? `${props.data.height / 10}m` : '',
    weight: props.data?.weight ? `${props.data.weight / 10}Kg` : '',
  }
})
</script>
