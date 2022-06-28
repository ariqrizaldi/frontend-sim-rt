<script setup>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import {
  mdiImageBroken,
  mdiCarSelect,
  mdiCarWrench
} from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import CardWidget from '@/components/CardWidget.vue'

const titleStack = ref(['Admin', 'Dashboard'])

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetchBy', {
    payload: 'AKTIF',
    link: 'laporanKerusakans/kategori-',
    state: 'laporanKerusakanAktif'
  })
  store.dispatch('fetchBy', {
    payload: 'MASUK',
    link: 'laporanKerusakans/kategori-',
    state: 'laporanKerusakanMasuk'
  })
  store.dispatch('fetchBy', {
    payload: 'SELESAI',
    link: 'laporanKerusakans/kategori-',
    state: 'riwayatLaporan'
  })
  store.dispatch('fetchBy', {
    payload: 'AKTIF',
    link: 'peminjamanKendaraans/kategori-',
    state: 'peminjamanKendaraanAktif'
  })
  store.dispatch('fetchBy', {
    payload: 'MASUK',
    link: 'peminjamanKendaraans/kategori-',
    state: 'peminjamanKendaraanMasuk'
  })
  store.dispatch('fetchBy', {
    payload: 'SELESAI',
    link: 'peminjamanKendaraans/kategori-',
    state: 'peminjamanKendaraanSelesai'
  })
  store.dispatch('fetchBy', {
    payload: 'SELESAI',
    link: 'servisKendaraans/kategori-',
    state: 'riwayatServis'
  })
  store.dispatch('fetchBy', {
    payload: 'MASUK',
    link: 'servisKendaraans/kategori-',
    state: 'servisKendaraanMasuk'
  })
  store.dispatch('fetchBy', {
    payload: 'AKTIF',
    link: 'servisKendaraans/kategori-',
    state: 'servisKendaraanAktif'
  })
})

const store = useStore()

const laporanMasuk = computed(() => store.getters.getLaporanKerusakanMasuk)
const laporanAktif = computed(() => store.getters.getLaporanKerusakanAktif)
const servisMasuk = computed(() => store.getters.getServisKendaraanMasuk)
const servisAktif = computed(() => store.getters.getServisKendaraanAktif)
const servisSelesai = computed(() => store.getters.getRiwayatServis)
const peminjamanSelesai = computed(() => store.getters.getRiwayatPeminjaman)
const laporanSelesai = computed(() => store.getters.getRiwayatLaporan)
const peminjamanMasuk = computed(() => store.getters.getPeminjamanKendaraanMasuk)
const peminjamanAktif = computed(() => store.getters.getPeminjamanKendaraanAktif)

//  const darkMode = computed(() => store.state.darkMode)
</script>
<template>
  <title-bar :title-stack="titleStack" />
  <main-section>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
      <card-widget
        trend="Masuk"
        color="text-emerald-500"
        :icon="mdiImageBroken"
        :number="laporanMasuk.length"
        label="Laporan Kerusakan"
      />
      <card-widget
        trend="Masuk"
        color="text-blue-500"
        :icon="mdiCarSelect"
        :number="peminjamanMasuk.length"
        label="Peminjaman Kendaraan"
      />
      <card-widget
        trend="Masuk"
        color="text-yellow-500"
        :icon="mdiCarWrench"
        :number="servisMasuk.length"
        label="Servis Kendaraan"
      />
      <card-widget
        trend="Aktif"
        color="text-emerald-500"
        :icon="mdiImageBroken"
        :number="laporanAktif.length"
        label="Laporan Kerusakan"
      />
      <card-widget
        trend="Aktif"
        color="text-blue-500"
        :icon="mdiCarSelect"
        :number="peminjamanAktif.length"
        label="Peminjaman Kendaraan"
      />
      <card-widget
        trend="Aktif"
        color="text-yellow-500"
        :icon="mdiCarWrench"
        :number="servisAktif.length"
        label="Servis Kendaraan"
      />
      <card-widget
        trend="Selesai"
        color="text-emerald-500"
        :icon="mdiImageBroken"
        :number="laporanSelesai.length"
        label="Laporan Kerusakan"
      />
      <card-widget
        trend="Selesai"
        color="text-blue-500"
        :icon="mdiCarSelect"
        :number="peminjamanSelesai.length"
        label="Peminjaman Kendaraan"
      />
      <card-widget
        trend="Selesai"
        color="text-yellow-500"
        :icon="mdiCarWrench"
        :number="servisSelesai.length"
        label="Servis Kendaraan"
      />
    </div>
  </main-section>
</template>
