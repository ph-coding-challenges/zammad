<template>
  <component
    v-bind:is="props.size"
    v-bind:class="`${
      FONT_SIZE_DICTIONARY[props.size]
    } text-zinc-800 font-bold my-2`"
  >
    <slot />
  </component>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'h1',
    validator: (value) => {
      const ACCEPTED_VALUES = ['h1', 'h2', 'h3', 'h4', 'h5']
      return ACCEPTED_VALUES.includes(value)
    },
  },
})

const FONT_SIZE_DICTIONARY = {
  h1: 'text-2xl',
  h2: 'text-xl',
  h3: 'text-lg',
  h4: 'text-base',
  h5: 'text-sm',
}
</script>
