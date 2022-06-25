<script setup>
import { computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import DataService from '@/services/data.service'
import { mdiExport, mdiFilter, mdiPlus, mdiCheckBold, mdiCloseThick } from '@mdi/js'
import { convertDate } from '@/helper.js'
import SearchField from '@/components/SearchField.vue'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Pill from '@/components/Pill.vue'
import FilePicker from '@/components/FilePicker.vue'
import Field from '@/components/Field.vue'
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

const items = computed(() => store.getters.getServisKendaraanMasuk)

const pemegang = computed(() => store.getters.getUsers)

const servis = computed(() => store.getters.getJenisServis)

const jenis = computed(() => store.getters.getJenisKendaraan)

const isModalSuccessActive = ref(false)

const isModalDangerActive = ref(false)

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

const checked = (isChecked, item) => {
  if (isChecked) {
    checkedRows.value.push(item)
  } else {
    checkedRows.value = remove(checkedRows.value, row => row.id === item.id)
  }
}
const openModalAgree = (isModalActive, item) => {
  if (isModalActive) {
    form.id = item
  }
}
const emit = defineEmits(['click-create'])

const idServisBatal = ref(0)

const openModalBatal = (isModalActive, item) => {
  if (isModalActive) {
    idServisBatal.value = item
  }
}
const form = reactive({
  id: null
})
const batal = () => {
  const data = {
    status: 'Ditolak',
    kategori: 'SELESAI'
  }
  DataService.update('/servisKendaraans/update/', idServisBatal.value, data)
    .then(response => {
      toast.success('Sukses ditolak')
      isModalDangerActive.value = false
      window.location.reload()
    })
    .catch(e => {
      toast.error(e.message)
    })
}

const clickCreate = (event) => {
  emit('click-create', event)
}
const file = ref(null)

const uploadPercent = ref(0)

const progressEvent = progressEvent => {
  uploadPercent.value = Math.round(
    (progressEvent.loaded * 100) / progressEvent.total
  )
}

const upload = (id) => {
  const formData = new FormData()
  formData.append('file', file.value)
  DataService.upload('/servisKendaraans/upload/surat-jalan/', id, formData, progressEvent)
    .then(response => {
      uploadPercent.value = 0
      toast.success('Sukses Upload Surat Jalan')
    })
    .catch((error) => {
      uploadPercent.value = 0
      toast.error(error.message)
    })
  file.value = undefined
}
const submit = () => {
  const data = {
    status: 'Proses servis',
    kategori: 'AKTIF'
  }
  upload(form.id)
  DataService.update('/servisKendaraans/update/', form.id, data)
    .then(response => {
      isModalSuccessActive.value = false
      toast.success('Berhasil menindaklanjuti Permintaan servis')
      window.location.reload()
    })
    .catch(e => {
      toast.error(e.message)
    })
}
</script>

<template>
  <modal-box
    v-model="isModalDangerActive"
    :large-title="'Konfirmasi Tolak Permintaan Servis #'+idServisBatal"
    button="danger"
    has-cancel
    @submit.prevent="batal"
  >
    <p class="text-lg">
      Apakah anda yakin untuk tidak menindaklanjuti permintan servis ini?
    </p>
  </modal-box>
  <modal-box
    v-model="isModalSuccessActive"
    button="success"
    title="Tindak Lanjuti Permintaan Servis"
    @submit.prevent="submit"
  >
    <field
      label="Surat Jalan"
      help="File harus berformat pdf dengan size maksimal 2mb"
    >
      <file-picker v-model="file" />
    </field>
    <field>
      <progress
        v-if="uploadPercent !=0"
        class="w-full"
        max="100"
        :value="uploadPercent"
      >
        {{ uploadPercent + '%' }}
      </progress>
    </field>
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
        <th>Pemegang</th>
        <th>Status</th>
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
        <td data-label="Pemegang">
          {{ pemegang.find( n => n.id == client.user).nama }}
        </td>
        <td data-label="Status">
          <pill
            type="danger"
            :text="client.status"
            small
          />
        </td>
        <td
          data-label="Aksi"
        >
          <jb-buttons
            type="justify-center"
            no-wrap
          >
            <jb-button
              color="success"
              :icon="mdiCheckBold"
              small
              tooltip="Tindak Lanjut"
              @click="openModalAgree(isModalSuccessActive = true, client.id)"
            />
            <jb-button
              color="danger"
              :icon="mdiCloseThick"
              tooltip="Tolak"
              small
              @click="openModalBatal(isModalDangerActive = true, client.id)"
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
