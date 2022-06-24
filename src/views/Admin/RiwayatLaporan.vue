<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import MainSection from '@/components/MainSection.vue'
// import Notification from '@/components/Notification.vue'
import RiwayatLaporanTable from '@/components/Table/Admin/RiwayatLaporanTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
// import TitleSubBar from '@/components/TitleSubBar.vue'

const titleStack = ref(['Admin', 'Laporan Kerusakan'])

const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetchBy', {
    payload: 'SELESAI',
    link: 'laporanKerusakans/kategori-',
    state: 'riwayatLaporan'
  })
  store.dispatch('fetch', 'jenisKerusakans')
  store.dispatch('fetch', 'detailKerusakans')
})

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Riwayat Laporan Kerusakan</hero-bar>
  <main-section>
    <card-component
      class="mb-6"
      has-table
    >
      <riwayat-laporan-table />
    </card-component>
  </main-section>
</template>
