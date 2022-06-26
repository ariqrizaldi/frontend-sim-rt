<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import MainSection from '@/components/MainSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import TeknisiPekerjaanTable from '@/components/Table/TeknisiPekerjaanTable.vue'
import HeroBar from '@/components/HeroBar.vue'

const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetchBy', {
    payload: store.state.auth.user.id,
    link: 'peminjamanKendaraans/sopir/',
    state: 'pesananSopir'
  })
  store.dispatch('fetch', 'jenisKendaraans')
  store.dispatch('fetch', 'kendaraans')
})
</script>

<template>
  <div class="pt-20" />
  <hero-bar>Pekerjaan Sopir</hero-bar>
  <main-section>
    <card-component
      title="Daftar Pekerjaan"
      class="mb-6"
      has-table
    >
      <teknisi-pekerjaan-table />
    </card-component>
  </main-section>
</template>
