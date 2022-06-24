<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import MainSection from '@/components/MainSection.vue'
// import Notification from '@/components/Notification.vue'
import RiwayatPeminjamanTable from '@/components/Table/Admin/RiwayatPeminjamanTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
// import TitleSubBar from '@/components/TitleSubBar.vue'

const titleStack = ref(['Admin', 'Peminjaman Kendaraan'])

const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetchBy', {
    payload: 'SELESAI',
    link: 'peminjamanKendaraans/kategori-',
    state: 'riwayatPeminjaman'
  })
  store.dispatch('fetch', 'jenisKendaraans')
})

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Riwayat Peminjaman Kendaraan</hero-bar>
  <main-section>
    <card-component
      class="mb-6"
      has-table
    >
      <riwayat-peminjaman-table />
    </card-component>
  </main-section>
</template>
