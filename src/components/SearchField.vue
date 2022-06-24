<script setup>
import Control from '@/components/Control.vue'
</script>

<template class="md:pb-0 pb-2">
  <control
    ref="root"
    placeholder="Search (ctrl+k)"
    ctrl-k-focus
    transparent
    borderless
  />
</template>
