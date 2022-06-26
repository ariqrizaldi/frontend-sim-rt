<script setup>
import { computed, reactive, ref } from 'vue'
import DataService from '@/services/data.service'
import { useStore } from 'vuex'
import { convertDate } from '@/helper.js'
import { mdiEye, mdiFileEdit, mdiPlus, mdiUpdate } from '@mdi/js'
import SearchField from '@/components/SearchField.vue'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import Divider from '@/components/Divider.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Pill from '@/components/Pill.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
// import UserAvatar from '@/components/UserAvatar.vue'
import { createToaster } from '@meforma/vue-toaster'

const toast = createToaster({
  position: 'top',
  duration: 2000
})

defineProps({
  checkable: Boolean
})

const store = useStore()

const lightBorderStyle = computed(() => store.state.lightBorderStyle)

const lightBgStyle = computed(() => store.state.lightBgStyle)

const tableTrStyle = computed(() => store.state.tableTrStyle)

const tableTrOddStyle = computed(() => store.state.tableTrOddStyle)

const darkMode = computed(() => store.state.darkMode)

const items = computed(() => store.getters.getLaporanByTeknisi)

const jenis = computed(() => store.getters.getJenisKerusakan)

const isModalActive = ref(false)

const isModalWarningActive = ref(false)

const detailLaporan = reactive({
  id: null,
  hasil: null,
  analisa: null,
  tindakan: null,
  status: null
})
const form = reactive({
  id: null,
  hasil: null,
  analisa: null,
  tindakan: null
})
const perPage = ref(10)

const currentPage = ref(0)

const checkedRows = ref([])

const itemsPaginated = computed(
  () => items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

const remove = (arr, cb) => {
  const newArr = []

  arr.forEach(item => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}

const clickDetail = (isModalActive, item, status) => {
  if (isModalActive) {
    detailLaporan.hasil = item.hasil
    detailLaporan.analisa = item.analisa
    detailLaporan.tindakan = item.tindakan
    detailLaporan.laporan = item.laporan
    detailLaporan.status = status
  }
}
const openModalEdit = (isModalActive, item) => {
  if (isModalActive) {
    form.id = item.id
    form.hasil = item.hasil
    form.analisa = item.analisa
    form.tindakan = item.tindakan
    form.laporan = item.laporan
    form.teknisi = item.teknisi
  }
}
const update = () => {
  const data = {
    hasil: form.hasil,
    tindakan: form.tindakan,
    analisa: form.analisa,
    laporan: form.laporan,
    teknisi: form.teknisi
  }
  DataService.update('/detailKerusakans/', form.id, data)
    .then(response => {
      toast.success('Telah diupdate')
      isModalWarningActive.value = false
      store.dispatch('fetch', 'detailKerusakans')
      window.location.reload()
    })
    .catch(e => {
      console.log(data)
      toast.error(e.message)
    })
}
const checked = (isChecked, item) => {
  if (isChecked) {
    checkedRows.value.push(item)
  } else {
    checkedRows.value = remove(checkedRows.value, row => row.id === item.id)
  }
}
</script>

<template>
  <modal-box
    v-model="isModalWarningActive"
    :large-title="'Edit Detail #'+ form.id"
    button="info"
    has-cancel
    @submit.prevent="update"
  >
    <field
      label="Analisa Pemeriksaan"
    >
      <control
        v-model="form.analisa"
        type="textarea"
        placeholder="Penjelasan terkait hasil pemeriksaan"
      />
    </field>

    <field
      label="Hasil dari perbaikan"
    >
      <control
        v-model="form.hasil"
        type="textarea"
        placeholder="Penjelasan terkait hasil perbaikan"
      />
    </field>
  </modal-box>
  <modal-box
    v-model="isModalActive"
    title="Detail Laporan"
    :has-submit="false"
  >
    <div v-if="detailLaporan.analisa">
      <div class="font-bold text-lg mb-2">
        Analisa Kerusakan
      </div>
      <p> {{ detailLaporan.analisa }} </p>
    </div>
    <p
      v-else
      class="font-reguler text-xl items-center justify-center"
    >
      Belum terdapat hasil pemeriksaan
    </p>
    <div v-if="detailLaporan.analisa">
      <div class="font-bold text-lg mb-2">
        Tindakan dari Kerusakan
      </div>
      <p> {{ detailLaporan.tindakan }} </p>
    </div>
    <jb-buttons
      class="md:mt-0 mt-4"
      no-wrap
    >
      <jb-button
        v-if="detailLaporan.status === 'Sedang diperiksa'&& detailLaporan.tindakan && !detailLaporan.hasil"
        color="success"
        label="Ubah Status Periksa"
        tooltip="Ubah status laporan"
        :icon="mdiUpdate"
        outline
        @click="tindakLanjut(detailLaporan.laporan, detailLaporan.tindakan)"
      />
    </jb-buttons>
    <div v-if="detailLaporan.tindakan">
      <div class="font-bold text-lg mb-2">
        Laporan Hasil
      </div>
      <p> {{ detailLaporan.hasil }} </p>
    </div>
    <divider />
  </modal-box>
  <div
    v-if="checkedRows.length"
    class="bg-opacity-50 p-3 dark:bg-gray-800"
    :class="lightBgStyle"
  >
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm dark:bg-gray-700"
      :class="lightBgStyle"
    >
      {{ checkedRow.name }}
    </span>
  </div>
  <div class="m-4 md:flex items-center md:justify-between">
    <search-field class="justify-center mr-2 md:w-3/6 w-full" />
    <jb-buttons
      class="md:mt-0 mt-4"
      type="justify-center"
      no-wrap
    >
      <jb-button
        v-if="admin"
        color="info"
        label="Tambah"
        :icon="mdiPlus"
        @click="clickCreate"
      />
    </jb-buttons>
  </div>
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Deskripsi Kerusakan</th>
        <th>Jenis Kerusakan</th>
        <th>Tanggal dibuat</th>
        <th>Lokasi</th>
        <th>Status</th>
        <th>Detail</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(client, index) in itemsPaginated"
        :key="client.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >
        <checkbox-cell
          v-if="checkable"
          @checked="checked($event, client)"
        />
        <td data-label="Id">
          {{ client.id }}
        </td>
        <td data-label="Deskripsi Kerusakan">
          {{ client.deskripsi }}
        </td>
        <td data-label="Jenis Kerusakan">
          {{ jenis.find( n => n.id == client.jenisKerusakan).nama }}
        </td>
        <td data-label="Tanggal dibuat">
          <small
            class="text-gray-500 dark:text-gray-400"
          >{{ convertDate(client.dateCreated) }}</small>
        </td>
        <td data-label="Lokasi">
          {{ client.lokasi }}
        </td>
        <td data-label="Status">
          <pill
            type="warning"
            :text="client.status"
            small
          />
        </td>
        <td data-label="Detail">
          <jb-buttons
            type="justify-center"
            no-wrap
          >
            <jb-button
              color="info"
              tooltip="Lihat Detail"
              :icon="mdiEye"
              small
              @click="clickDetail( isModalActive = true, client)"
            />
          </jb-buttons>
        </td>
        <td data-label="Aksi">
          <jb-buttons
            type="justify-center"
            no-wrap
          >
            <jb-button
              color="warning"
              :icon="mdiFileEdit"
              tooltip="Edit"
              small
              @click="openModalEdit(isModalWarningActive = true, client)"
            />
          </jb-buttons>
        </td>
      </tr>
    </tbody>
  </table>
  <div
    :class="lightBorderStyle"
    class="p-3 lg:px-6 border-t dark:border-gray-800"
  >
    <level>
      <jb-buttons>
        <jb-button
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :outline="darkMode"
          small
          @click="currentPage = page"
        />
      </jb-buttons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </level>
  </div>
</template>
