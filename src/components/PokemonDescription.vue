<template>
  <div>
    <div class="flex justify-end gap-4">
      <button
        class="rounded-full transition ease-in-out py-2 px-4 bg-amber-100 hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed"
        v-bind:disabled="isLoadingError"
        v-on:click.prevent="execute"
      >
        <span v-if="isLoadingError">...</span>
        <span v-else>Force error request</span>
      </button>

      <button
        class="rounded-full transition ease-in-out py-2 px-4 bg-red-100 hover:bg-red-200"
        v-on:click.prevent="router.push({ name: 'pokemon:list' })"
      >
        Close
      </button>
    </div>

    <img v-bind:src="props.img.front_default" class="w-[200px] mx-auto" />
    <p class="font-bold text-lg text-gray-600 -mb-4">#{{ id }}</p>
    <Headings class="capitalize">{{ pokemonName }}</Headings>

    <Loader v-if="isFetching" />
    <h3 v-else>{{ pokemonDescription }}</h3>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import API from '../api/pokemon.api'
import { useFetchJson } from '../composables/fetch-composable'

import Headings from './ui/Headings.vue'
import Loader from './ui/Loader.vue'

const props = defineProps({
  id: Number,
  img: Object,
})

const route = useRoute()
const router = useRouter()

const { data, isFetching } = useFetchJson(
  API.GET_POKEMON_DESCRIPTION(props.id),
  { immediate: true },
)

const { isFetching: isLoadingError, execute } = useFetchJson(
  API.GET_ERROR_MESSAGE(),
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
