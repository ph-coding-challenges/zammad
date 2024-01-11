<template>
  <button
    class="w-60 h-20 bg-white rounded-lg shadow-lg hover:bg-indigo-100 uppercase font-bold"
    v-on:click.prevent="
      router.push({ name: 'pokemon:detail', params: { name: props.name } })
    "
  >
    {{ props.name }}
  </button>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  name: String,
})

const router = useRouter()
</script>
