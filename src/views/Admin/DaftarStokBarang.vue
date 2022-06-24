<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import MainSection from '@/components/MainSection.vue'
// import Notification from '@/components/Notification.vue'
import BarangTable from '@/components/Table/Admin/BarangTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'

const titleStack = ref(['Admin', 'Stok Barang'])
const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetch', 'unitBarangs')
  store.dispatch('fetch', 'jenisBarangs')
  store.dispatch('fetch', 'barangs')
})

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Daftar Stok Barang</hero-bar>
  <main-section>
    <card-component
      class="mb-6"
      has-table
    >
      <barang-table />
    </card-component>
  </main-section>
</template>
