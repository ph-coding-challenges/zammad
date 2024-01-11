<template>
  {{ props.stat }}
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  stat: Object,
})
</script>
