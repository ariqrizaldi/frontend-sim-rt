<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import MainSection from '@/components/MainSection.vue'
// import Notification from '@/components/Notification.vue'
import PeminjamanTable from '@/components/Table/User/PeminjamanTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

const titleStack = ref(['User', 'Peminjaman Kendaraan'])

const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetchBy', {
    payload: store.state.userId,
    link: 'peminjamanKendaraans/user/',
    state: 'peminjamanByUser'
  })
  store.dispatch('fetch', 'jenisKendaraans')
})
</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Daftar Peminjaman Kendaraan</hero-bar>
  <main-section>
    <card-component
      class="mb-6"
      has-table
    >
      <peminjaman-table />
    </card-component>
  </main-section>
</template>
