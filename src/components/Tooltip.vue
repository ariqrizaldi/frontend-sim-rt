<script setup>
defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div className="relative inline-block items-center group">
    <slot />
    <div
      className="absolute bottom-0 flex-col items-center hidden mb-8 w-6 group-hover:flex"
    >
      <span
        class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md opacity-90"
      >{{ text }}</span>
    </div>
  </div>
</template>
