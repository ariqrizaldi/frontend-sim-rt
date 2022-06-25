<script setup>
import { computed, reactive, ref } from 'vue'
import DataService from '@/services/data.service'
import { useStore } from 'vuex'
import { mdiExport, mdiFilter, mdiPlus, mdiEye, mdiStickerCheck, mdiDownload } from '@mdi/js'
import { convertDate } from '@/helper.js'
import SearchField from '@/components/SearchField.vue'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Pill from '@/components/Pill.vue'
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

const items = computed(() => store.getters.getServisKendaraanAktif)

const pemegang = computed(() => store.getters.getUsers)

const servis = computed(() => store.getters.getJenisServis)

const jenis = computed(() => store.getters.getJenisKendaraan)

const isModalActive = ref(false)

const isModalConfirm = ref(false)

const isModalFilter = ref(false)

const isModalExport = ref(false)

const detail = reactive({ user: '', namaBukti: '', buktiServis: null, keterangan: '' })

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

const clickDetail = (isModalActive, item) => {
  if (isModalActive) {
    detail.user = item.user
    detail.namaBukti = item.namaBukti
    detail.urlBukti = item.urlBukti
  }
}

const checked = (isChecked, item) => {
  if (isChecked) {
    checkedRows.value.push(item)
  } else {
    checkedRows.value = remove(checkedRows.value, row => row.id === item.id)
  }
}
const emit = defineEmits(['click-create'])

const clickCreate = (event) => {
  emit('click-create', event)
}

const openModalTutup = (isModalActive, item) => {
  if (isModalActive) {
    file.id = item.id
  }
}

const file = reactive({
  id: ''
})
const tutup = () => {
  const data = {
    status: 'Selesai',
    kategori: 'SELESAI'
  }
  DataService.update('/servisKendaraans/update/', file.id, data)
    .then(() => {
      toast.success('Servis telah ditutup')
      isModalConfirm.value = false
      window.location.reload()
    })
    .catch(e => {
      toast.error(e.message)
    })
}
</script>

<template>
  <modal-box
    v-model="isModalFilter"
    large-title="Please confirm"
    button-label="Submit"
    button="info"
    has-cancel
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </modal-box>
  <modal-box
    v-model="isModalExport"
    large-title="Please confirm"
    button-label="Submit"
    button="info"
    has-cancel
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </modal-box>

  <modal-box
    v-model="isModalActive"
    title="Detail Laporan"
    :has-submit="false"
  >
    <div class="font-bold text-lg mb-2">
      Pemegang
    </div>
    <p v-if="detail.user">
      {{ pemegang.find( n => n.id == detail.user).nama }}
    </p>
    <divider />
    <div class="font-bold text-lg mb-2">
      Bukti Servis
    </div>
    <jb-button
      v-if="detail.namaBukti"
      color="success"
      label="Unduh bukti servis"
      :icon="mdiDownload"
      small
      :href="detail.urlBukti"
    />
    <p v-else>
      Belum terdapat bukti servis
    </p>
    <divider />
  </modal-box>
  <modal-box
    v-model="isModalConfirm"
    :large-title="'Konfirmasi Tutup Servis #'+file.id"
    button="success"
    has-cancel
    @submit.prevent="tutup"
  >
    <p>Yakin tutup proses servis ?</p>
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
      <jb-button
        color="light"
        label="Filter"
        tooltip="Filter"
        :icon="mdiFilter"
        outline
        @click="isModalFilter= true"
      />
      <jb-button
        color="light"
        label="Export"
        :icon="mdiExport"
        outline
        @click="isModalExport = true"
      />
    </jb-buttons>
  </div>
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Deskripsi</th>
        <th>Jenis Kendaraan</th>
        <th>Jenis Servis</th>
        <th>Tanggal dibuat</th>
        <th>Tanggal Servis</th>
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
        <td data-label="Deskripsi">
          {{ client.deskripsi }}
        </td>
        <td data-label="Jenis Kendaraan">
          {{ jenis.find( n => n.id == client.jenisKendaraan).nama }}
        </td>
        <td data-label="Jenis Kendaraan">
          {{ servis.find( n => n.id == client.jenisServis).nama }}
        </td>
        <td data-label="Tanggal dibuat">
          <small
            class="text-gray-500 dark:text-gray-400"
          >{{ convertDate(client.dateCreated) }}</small>
        </td>
        <td data-label="Tanggal servis">
          <small
            class="text-gray-500 dark:text-gray-400"
          >{{ convertDate(client.tanggalServis) }}</small>
        </td>
        <td data-label="Status">
          <pill
            type="warning"
            :text="client.status"
            small
          />
        </td>
        <td data-label="Keterangan lain">
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
            v-if="client.namaBukti"
            type="justify-center"
            no-wrap
          >
            <jb-button
              color="success"
              tooltip="Tutup servis"
              :icon="mdiStickerCheck"
              small
              @click="openModalTutup(isModalConfirm = true, client)"
            />
          </jb-buttons>
          <jb-buttons
            v-else
            type="justify-center"
            no-wrap
          >
            <small
              class="text-gray-500 dark:text-gray-400 justify-center"
            >Tidak ada aksi</small>
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
