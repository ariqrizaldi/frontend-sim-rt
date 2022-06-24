<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import MainSection from '@/components/MainSection.vue'
import LaporanAktifTable from '@/components/Table/Admin/LaporanAktifTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

const titleStack = ref(['Admin', 'Laporan Kerusakan'])

const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetchBy', {
    payload: 'AKTIF',
    link: 'laporanKerusakans/kategori-',
    state: 'laporanKerusakanAktif'
  })
  store.dispatch('fetch', 'jenisKerusakans')
  store.dispatch('fetchBy', {
    payload: '5',
    link: 'users/usersByRole/',
    state: 'usersTeknisi'
  })
  store.dispatch('fetch', 'detailKerusakans')
})

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Daftar Laporan Kerusakan Aktif</hero-bar>
  <main-section>
    <card-component
      class="mb-6"
      has-table
    >
      <laporan-aktif-table />
    </card-component>
  </main-section>
</template>
