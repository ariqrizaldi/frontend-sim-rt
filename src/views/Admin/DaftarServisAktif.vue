<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import MainSection from '@/components/MainSection.vue'
// import Notification from '@/components/Notification.vue'
import ServisAktifTable from '@/components/Table/Admin/ServisAktifTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
// import TitleSubBar from '@/components/TitleSubBar.vue'

const titleStack = ref(['Admin', 'Permintaan Servis Kendaraan'])

const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetchBy', {
    payload: 'AKTIF',
    link: 'servisKendaraans/kategori-',
    state: 'servisKendaraanAktif'
  })
  store.dispatch('fetch', 'jenisKendaraans')
  store.dispatch('fetch', 'jenisServis')
  store.dispatch('fetch', 'users')
})

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Daftar Permintaan Servis Kendaraan Aktif</hero-bar>
  <main-section>
    <card-component
      class="mb-6"
      has-table
    >
      <servis-aktif-table />
    </card-component>
  </main-section>
</template>
