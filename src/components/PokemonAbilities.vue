<template>
  <Headings size="h2">Abilities</Headings>
  <PokemonAbilityWrapper
    v-for="ability in mappedAbilities"
    v-bind:key="ability.name"
    v-bind:ability="ability"
  />
</template>

<script setup>
import { computed, defineProps } from 'vue'

import Headings from './ui/Headings.vue'
import PokemonAbilityWrapper from './PokemonAbilityWrapper.vue'

const props = defineProps({
  abilities: Object,
})

const mappedAbilities = computed(() =>
  props.abilities.map((a) => {
    return { name: a.ability.name, is_hidden: a.is_hidden }
  }),
)
</script>
