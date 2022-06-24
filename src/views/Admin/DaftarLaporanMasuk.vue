<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import MainSection from '@/components/MainSection.vue'
import LaporanMasukTable from '@/components/Table/Admin/LaporanMasukTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
// import TitleSubBar from '@/components/TitleSubBar.vue'

const titleStack = ref(['Admin', 'Laporan Kerusakan'])

const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetchBy', {
    payload: 'MASUK',
    link: 'laporanKerusakans/kategori-',
    state: 'laporanKerusakanMasuk'
  })
  store.dispatch('fetch', 'jenisKerusakans')
  store.dispatch('fetch', 'users')
  store.dispatch('fetchBy', {
    payload: '5',
    link: 'users/usersByRole/',
    state: 'usersTeknisi'
  })
})

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Daftar Laporan Kerusakan Masuk</hero-bar>
  <main-section>
    <card-component
      class="mb-6"
      has-table
    >
      <laporan-masuk-table />
    </card-component>
  </main-section>
</template>
