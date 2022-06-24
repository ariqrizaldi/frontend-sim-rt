<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import MainSection from '@/components/MainSection.vue'
// import Notification from '@/components/Notification.vue'
import PeminjamanMasukTable from '@/components/Table/Admin/PeminjamanMasukTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
// import TitleSubBar from '@/components/TitleSubBar.vue'

const titleStack = ref(['Admin', 'Peminjaman Kendaraan'])

const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetchBy', {
    payload: 'MASUK',
    link: 'peminjamanKendaraans/kategori-',
    state: 'peminjamanKendaraanMasuk'
  })
  store.dispatch('fetchBy', {
    payload: '6',
    link: 'users/usersByRole/',
    state: 'usersSopir'
  })
  store.dispatch('fetchBy', {
    payload: 'available',
    link: 'kendaraans/',
    state: 'kendaraanPinjam'
  })
  store.dispatch('fetch', 'kendaraans')
  store.dispatch('fetch', 'users')
  store.dispatch('fetch', 'jenisKendaraans')
})

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Daftar Peminjaman Kendaraan Masuk</hero-bar>
  <main-section>
    <card-component
      class="mb-6"
      has-table
    >
      <peminjaman-masuk-table />
    </card-component>
  </main-section>
</template>
