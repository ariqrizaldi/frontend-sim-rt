<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import MainSection from '@/components/MainSection.vue'
// import Notification from '@/components/Notification.vue'
import PeminjamanAktifTable from '@/components/Table/Admin/PeminjamanAktifTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
// import TitleSubBar from '@/components/TitleSubBar.vue'

const store = useStore()

const titleStack = ref(['Admin', 'Peminjaman Kendaraan'])

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetchBy', {
    payload: 'AKTIF',
    link: 'peminjamanKendaraans/kategori-',
    state: 'peminjamanKendaraanAktif'
  })
  store.dispatch('fetch', 'jenisKendaraans')
  store.dispatch('fetch', 'users')
})

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Daftar Peminjaman Kendaraan Aktif</hero-bar>
  <main-section>
    <card-component
      class="mb-6"
      has-table
    >
      <peminjaman-aktif-table />
    </card-component>
  </main-section>
</template>
