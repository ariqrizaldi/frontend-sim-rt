<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import Icon from '@/components/Icon.vue'
import Level from '@/components/Level.vue'

const store = useStore()

defineProps({
  icon: {
    type: String,
    default: null
  }
})

const lightBorderStyle = computed(() => store.state.lightBorderStyle)

</script>

<template>
  <section
    :class="lightBorderStyle"
    class="bg-white border-t border-b rounded-lg shadow-md p-4 mx-3 md:mx-6 dark:bg-gray-900/70 dark:border-gray-900 dark:text-white"
  >
    <level>
      <div class="flex items-center justify-start">
        <icon
          v-if="icon"
          :path="icon"
          :size="24"
          class="mr-2"
        />
        <h1 class="text-2xl font-semibold leading-tight">
          <slot />
        </h1>
      </div>
    </level>
  </section>
</template>
