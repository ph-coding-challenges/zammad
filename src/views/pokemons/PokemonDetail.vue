<template>
  <Loader v-if="isFetching" />

  <div v-else class="h-auto bg-white rounded-lg shadow-lg p-6">
    <PokemonDescription
      v-if="pokemonId"
      v-bind:id="pokemonId"
      v-bind:img="pokemonImages"
    />
    <PokemonAbilities
      v-if="pokemonAbilities"
      v-bind:abilities="pokemonAbilities"
    />
    <PokemonData v-if="data" v-bind:data="data" />
    <PokemonStats v-if="pokemonStats" v-bind:stats="pokemonStats" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import API from '../../api/pokemon.api'
import { useFetchJson } from '../../composables/fetch-composable'

import Loader from '../../components/ui/Loader.vue'
import PokemonAbilities from '../../components/PokemonAbilities.vue'
import PokemonData from '../../components/PokemonData.vue'
import PokemonDescription from '../../components/PokemonDescription.vue'
import PokemonStats from '../../components/PokemonStats.vue'

const route = useRoute()

const { data, isFetching } = useFetchJson(
  API.GET_POKEMON_DATA(route.params.name),
  { immediate: true },
)

const pokemonId = computed(() => data.value?.id)
const pokemonImages = computed(() => data.value?.sprites)
const pokemonAbilities = computed(() => data.value?.abilities)
const pokemonStats = computed(() => data.value?.stats)
</script>
