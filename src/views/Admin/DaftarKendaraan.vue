<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import MainSection from '@/components/MainSection.vue'
// import Notification from '@/components/Notification.vue'
import KelolaUnitKendaraanTable from '@/components/Table/Admin/KelolaUnitKendaraanTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

const store = useStore()
onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetch', 'kendaraans')
  store.dispatch('fetch', 'jenisKendaraans')
  store.dispatch('fetch', 'users')
})

const titleStack = ref(['Admin', 'Kendaraan Dinas'])

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Daftar Kendaraan Dinas</hero-bar>
  <main-section>
    <card-component
      class="mb-6"
      has-table
    >
      <kelola-unit-kendaraan-table />
    </card-component>
  </main-section>
</template>
