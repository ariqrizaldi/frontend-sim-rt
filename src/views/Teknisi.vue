<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import MainSection from '@/components/MainSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import TeknisiPekerjaanTable from '@/components/Table/TeknisiPekerjaanTable.vue'
import TeknisiPengawasanTable from '@/components/Table/TeknisiPengawasanTable.vue'
import HeroBar from '@/components/HeroBar.vue'

const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetchBy', {
    payload: store.state.auth.user.id,
    link: 'laporanKerusakans/teknisi/',
    state: 'laporanKerusakanTeknisi'
  })
  store.dispatch('fetchBy', {
    payload: store.state.auth.user.id,
    link: 'laporanKerusakans/teknisi-pengawasan/',
    state: 'pengawasanTeknisi'
  })
  store.dispatch('fetch', 'jenisKerusakans')
})
</script>

<template>
  <div class="pt-20" />
  <hero-bar>Pekerjaan Teknisi</hero-bar>
  <main-section>
    <card-component
      title="Pekerjaan pemeriksaan"
      class="mb-6"
      has-table
    >
      <teknisi-pekerjaan-table />
    </card-component>
    <card-component
      title="Pekerjaan pengawasan"
      class="mb-6"
      has-table
    >
      <teknisi-pengawasan-table />
    </card-component>
  </main-section>
</template>
