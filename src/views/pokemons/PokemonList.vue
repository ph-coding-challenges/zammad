<template>
  <loader v-if="isFetching" />

  <div v-else class="flex w-full max-h-full overflow-hidden">
    <div
      class="flex flex-wrap flex-grow gap-4 overflow-auto justify-center p-6"
    >
      <PokemonCard
        v-for="{ name } in data?.results"
        v-bind:key="name"
        v-bind:name="name"
      />
    </div>

    <div v-bind:class="showDetails ? 'w-[600px] px-4 my-auto' : 'w-0'">
      <router-view v-bind:key="route.params.name" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import API from '../../api/pokemon.api'
import { useFetchJson } from '../../composables/fetch-composable'

import Loader from '../../components/ui/Loader.vue'
import PokemonCard from '../../components/PokemonCard.vue'

const route = useRoute()

const showDetails = computed(() => route.params.name?.length)

const { data, isFetching } = useFetchJson(API.GET_POKEMON_LIST(), {
  immediate: true,
})
</script>
