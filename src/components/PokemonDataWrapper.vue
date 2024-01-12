<template>
  <div class="w-40">
    <Headings size="h5" class="uppercase">{{ props.title }}</Headings>
    <div class="w-40 bg-gray-200 rounded-full p-3 border text-center font-bold">
      <span>{{ props.data }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

import Headings from './ui/Headings.vue'

const props = defineProps({
  data: [String, Number],
  title: String,
})
</script>
