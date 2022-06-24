<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import MainSection from '@/components/MainSection.vue'
// import Notification from '@/components/Notification.vue'
import LaporanTable from '@/components/Table/User/LaporanTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
// import TitleSubBar from '@/components/TitleSubBar.vue'

const titleStack = ref(['User', 'Laporan Kerusakan'])

const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetchBy', {
    payload: store.state.auth.user.id,
    link: 'laporanKerusakans/user/',
    state: 'laporanByUser'
  })
  store.dispatch('fetch', 'jenisKerusakans')
})
</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Daftar Laporan Kerusakan</hero-bar>
  <main-section>
    <card-component
      class="mb-6"
      has-table
    >
      <laporan-table />
    </card-component>
  </main-section>
</template>
