<template>
  <button v-on:click.prevent="router.push({ name: 'pokemon:list' })">
    close
  </button>

  <h2 v-if="isFetching">loading...</h2>

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
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import API from '../../api/pokemon.api'
import { useFetchJson } from '../../composables/fetch-composable'

import PokemonAbilities from '../../components/PokemonAbilities.vue'
import PokemonData from '../../components/PokemonData.vue'
import PokemonDescription from '../../components/PokemonDescription.vue'
import PokemonStats from '../../components/PokemonStats.vue'

const route = useRoute()
const router = useRouter()

const { data, isFetching } = useFetchJson(
  API.GET_POKEMON_DATA(route.params.name),
  { immediate: true },
)

const pokemonId = computed(() => data.value?.id)
const pokemonImages = computed(() => data.value?.sprites)
const pokemonAbilities = computed(() => data.value?.abilities)
const pokemonStats = computed(() => data.value?.stats)
</script>
