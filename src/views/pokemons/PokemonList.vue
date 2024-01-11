<template>
  <loader v-if="isFetching" />
  <h2 v-else-if="error">error</h2>

  <div v-else class="flex w-full h-full overflow-hidden">
    <div class="w-60 overflow-auto">
      <ul>
        <li v-for="{ name } in data?.results" v-bind:key="name">
          <router-link
            v-bind:to="{ name: 'pokemon:detail', params: { name: name } }"
          >
            {{ name }}
          </router-link>
        </li>
      </ul>
    </div>

    <div v-bind:class="showDetails ? 'grow' : 'w-0'">
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

const route = useRoute()

const showDetails = computed(() => route.params.name?.length)

const { data, error, isFetching } = useFetchJson(API.GET_POKEMON_LIST(), {
  immediate: true,
})
</script>
