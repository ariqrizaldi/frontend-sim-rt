<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Level from '@/components/Level.vue'

const store = useStore()

const year = computed(() => new Date().getFullYear())

const isFooterBarVisible = computed(() => !store.state.isFullScreen)
</script>

<template>
  <footer
    v-show="isFooterBarVisible"
    class="bg-white py-2 px-6 shadow-md dark:bg-gray-900/70 bottom-0 fixed w-full"
  >
    <level>
      <div class="text-center md:text-left">
        <b>&copy; {{ year }} oleh <a
          href="#"
          target="_blank"
        >Ariq Rizaldi F</a>.</b>
      </div>
    </level>
  </footer>
</template>
