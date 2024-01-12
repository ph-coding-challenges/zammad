<template>
  <div
    v-if="show"
    v-bind:class="`${TYPE_DICTIONARY[type]} text-white font-bold fixed top-6 right-6 px-5 py-2 rounded-lg z-[100]`"
  >
    {{ message }}
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useToasty } from '../../composables/toasty-composable'

const { show, message, type } = useToasty()

const TYPE_DICTIONARY = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  warning: 'bg-amber-500',
}

watch(show, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      show.value = false
    }, 3000)
  }
})
</script>
