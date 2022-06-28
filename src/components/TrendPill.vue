<script setup>
import { computed } from 'vue'
import Pill from '@/components/Pill.vue'

const props = defineProps({
  trend: {
    type: String,
    required: true
  },
  trendType: {
    type: String,
    default: null
  },
  small: Boolean
})

const trendStyle = computed(() => {
  if (props.trend === 'Masuk') {
    return {
      style: 'info'
    }
  }

  if (props.trend === 'Selesai') {
    return {
      style: 'success'
    }
  }

  if (props.trend === 'Aktif') {
    return {
      style: 'warning'
    }
  }

  return {
    style: 'info'
  }
})
</script>

<template>
  <pill
    :text="trend"
    :type="trendStyle.style"
    :icon="trendStyle.icon"
    :small="small"
  />
</template>
