<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import MainSection from '@/components/MainSection.vue'
// import Notification from '@/components/Notification.vue'
import LaporanLanjutanTable from '@/components/Table/Admin/LaporanLanjutanTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
// import TitleSubBar from '@/components/TitleSubBar.vue'

const titleStack = ref(['Admin', 'Laporan Kerusakan'])

const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetch', 'users')
  store.dispatch('fetch', 'kerusakanLanjutans')
})

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Daftar Laporan Kerusakan Lanjutan</hero-bar>
  <main-section>
    <card-component
      class="mb-6"
      has-table
    >
      <laporan-lanjutan-table />
    </card-component>
  </main-section>
</template>
