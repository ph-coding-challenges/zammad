<template>
  <Headings size="h2">data</Headings>
  <p>{{ pokemonInfo.base_experience }}</p>
  <p>{{ pokemonInfo.height }}</p>
  <p>{{ pokemonInfo.weight }}</p>
</template>

<script setup>
import { computed, defineProps } from 'vue'

import Headings from './ui/Headings.vue'

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
