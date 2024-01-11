<template>
  <div
    v-bind:class="`flex justify-between w-40 bg-gray-200 rounded-full p-3 border ${
      isHidden ? 'border-red-400' : 'border-gray-400'
    }`"
  >
    <span>{{ name }}</span>

    <img
      v-if="isHidden"
      src="../assets/hidden-icon.svg"
      class="w-4"
      title="Ability is hidden"
    />
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  ability: Object,
})

const isHidden = computed(() => props.ability?.is_hidden)
const name = computed(() => {
  if (!props.ability?.name) return ''

  return props.ability.name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})
</script>
