<script setup>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import {
  mdiImageBroken,
  mdiCarWrench,
  mdiCarSelect
} from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import CardWidget from '@/components/CardWidget.vue'
import Notification from '@/components/Notification.vue'

const titleStack = ref(['User', 'Dashboard'])

const currentUser = computed(() => store.state.auth.user)

onMounted(() => {
  store.dispatch('fetchBy', {
    payload: currentUser.value.id,
    link: 'laporanKerusakans/user/',
    state: 'laporanByUser'
  })
  store.dispatch('fetchBy', {
    payload: currentUser.value.id,
    link: 'peminjamanKendaraans/user/',
    state: 'peminjamanByUser'
  })
  store.dispatch('fetchBy', {
    payload: store.state.auth.user.id,
    link: 'servisKendaraans/user/',
    state: 'servisByUser'
  })
})

const store = useStore()
const laporan = computed(() => store.getters.getLaporanByUser)
const peminjaman = computed(() => store.getters.getPeminjamanByUser)
const servis = computed(() => store.getters.getServisByUser)
//  const darkMode = computed(() => store.state.darkMode)
</script>

<template>
  <title-bar :title-stack="titleStack" />
  <main-section>
    <notification
      color="info"
      :icon="mdiMonitorCellphone"
    >
      <b>Selamat datang </b> {{ currentUser.username }}
    </notification>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
      <card-widget
        color="text-emerald-500"
        :icon="mdiImageBroken"
        :number="laporan.length"
        label="Laporan Kerusakan"
      />
      <card-widget
        color="text-blue-500"
        :icon="mdiCarSelect"
        :number="peminjaman.length"
        label="Peminjaman Kendaraan"
      />
      <card-widget
        color="text-yellow-500"
        :icon="mdiCarWrench"
        :number="servis.length"
        label="Servis Kendaraan"
      />
    </div>
  </main-section>
</template>
