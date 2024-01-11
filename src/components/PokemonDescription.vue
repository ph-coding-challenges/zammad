<template>
  <img v-bind:src="props.img.front_default" alt="" />
  <p>#{{ id }}</p>
  <Headings class="capitalize">{{ pokemonName }}</Headings>

  <h3 v-if="isFetching">... loading</h3>
  <h3 v-else>{{ pokemonDescription }}</h3>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useRoute } from 'vue-router'

import API from '../api/pokemon.api'
import { useFetchJson } from '../composables/fetch-composable'

import Headings from './ui/Headings.vue'

const props = defineProps({
  id: Number,
  img: Object,
})

const route = useRoute()

const { data, isFetching } = useFetchJson(
  API.GET_POKEMON_DESCRIPTION(props.id),
  { immediate: true },
)

const pokemonName = route.params.name

const pokemonDescription = computed(() => {
  const englishEntries = data.value?.flavor_text_entries.filter(
    (d) => d.language.name === 'en',
  )

  if (englishEntries?.length) {
    const random = Math.floor(Math.random() * englishEntries.length)
    return englishEntries[random].flavor_text
  }

  return ''
})
</script>
