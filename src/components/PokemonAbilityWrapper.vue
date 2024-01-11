<template>
  {{ props.ability }}
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  ability: Object,
})
</script>
