<script setup>
import { computed, reactive, ref } from 'vue'
import DataService from '@/services/data.service'
import { useStore } from 'vuex'
import { convertDate, toDate, dateInput } from '@/helper.js'
import { mdiEye, mdiFileEdit, mdiExport, mdiFilter, mdiStickerCheck } from '@mdi/js'
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

defineProps({
  checkable: Boolean
})

const store = useStore()

const lightBorderStyle = computed(() => store.state.lightBorderStyle)

const lightBgStyle = computed(() => store.state.lightBgStyle)

const tableTrStyle = computed(() => store.state.tableTrStyle)

const tableTrOddStyle = computed(() => store.state.tableTrOddStyle)

const darkMode = computed(() => store.state.darkMode)

const items = computed(() => store.getters.getPeminjamanKendaraanAktif)

const jenis = computed(() => store.getters.getJenisKendaraan)

const isModalActive = ref(false)

const isModalWarningActive = ref(false)

const isModalConfirm = ref(false)

const isModalFilter = ref(false)

const isModalExport = ref(false)

const detailPeminjaman = reactive({ tanggalAmbil: '', tanggalKembali: '', tanggalAmbilKunci: '', tanggalKembaliKunci: '' })

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
const form = reactive({
  id: '',
  tanggalAmbil: '',
  tanggalAmbilKunci: '',
  tanggalKembaliKunci: ''
})
const file = reactive({
  id: ''
})
const openModalEdit = (isModalActive, item) => {
  if (isModalActive) {
    form.id = item.id
    form.tanggalAmbil = dateInput(item.tanggalAmbil)
    form.tanggalAmbilKunci = dateInput(item.tanggalAmbilKunci)
    form.tanggalKembaliKunci = dateInput(item.tanggalKembaliKunci)
  }
}

const openModalTutup = (isModalActive, item) => {
  if (isModalActive) {
    file.id = item.id
  }
}

const clickDetail = (isModalActive, item) => {
  if (isModalActive) {
    detailPeminjaman.tanggalAmbil = item.tanggalAmbil
    detailPeminjaman.tanggalAmbilKunci = item.tanggalAmbilKunci
    detailPeminjaman.tanggalKembaliKunci = item.tanggalKembaliKunci
  }
}

const checked = (isChecked, item) => {
  if (isChecked) {
    checkedRows.value.push(item)
  } else {
    checkedRows.value = remove(checkedRows.value, row => row.id === item.id)
  }
}

const update = () => {
  const data = {
    tanggalAmbil: toDate(form.tanggalAmbil),
    tanggalAmbilKunci: toDate(form.tanggalAmbilKunci),
    tanggalKembaliKunci: toDate(form.tanggalKembaliKunci)
  }
  DataService.update('/peminjamanKendaraans/update-tanggal/', form.id, data)
    .then(response => {
      console.log(response.data)
      alert('Telah diupdate')
      isModalWarningActive.value = false
      store.dispatch('fetch', 'peminjamanKendaraans')
      window.location.reload()
    })
    .catch(e => {
      console.log(data)
      alert(e.message)
    })
}

const tutup = () => {
  const data = {
    status: 'Selesai',
    kategori: 'SELESAI'
  }
  const key = {
    id: null,
    kendaraan: null
  }
  const status = {
    status: 'Tersedia'
  }
  const statusKendaraan = {
    status: 'Selesai'
  }
  DataService.get('/pesananKendaraans/peminjaman/', file.id)
    .then(response => {
      key.id = response.data.id
      key.kendaraan = response.data.kendaraan
      DataService.update('/pesananKendaraans/update/', key.id, statusKendaraan)
        .then(() => {
          console.log('Telah diupdate')
        })
        .catch(e => {
          alert(e.message)
        })
      DataService.update('/kendaraans/update/', key.kendaraan, status)
        .then(() => {
          console.log('Telah diupdate')
        })
        .catch(e => {
          alert(e.message)
        })
    })
    .catch(e => {
      alert(e.message)
    })
  DataService.update('/peminjamanKendaraans/update/', file.id, data)
    .then(() => {
      alert('Peminjaman telah ditutup')
      window.location.reload()
      isModalConfirm.value = false
    })
    .catch(e => {
      alert(e.message)
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
    title="Detail Tanggal"
    :has-submit="false"
  >
    <div class="font-bold text-lg mb-2">
      Tanggal ambil kunci
    </div>
    <p> {{ convertDate(detailPeminjaman.tanggalAmbilKunci) }} </p>
    <divider />
    <div class="font-bold text-lg mb-2">
      Tanggal ambil
    </div>
    <p> {{ convertDate(detailPeminjaman.tanggalAmbil) }} </p>
    <divider />
    <div class="font-bold text-lg mb-2">
      Tanggal kembali kunci
    </div>
    <p> {{ convertDate(detailPeminjaman.tanggalKembaliKunci) }} </p>
    <divider />
  </modal-box>
  <modal-box
    v-model="isModalWarningActive"
    :large-title="'Edit Tanggal #'+ form.id"
    button="info"
    has-cancel
    @submit.prevent="update"
  >
    <field
      label="Tanggal Ambil"
    >
      <control
        v-model="form.tanggalAmbil"
        type="datetime-local"
        placeholder="Tanggal"
      />
    </field>

    <field
      label="Tanggal Ambil Kunci"
    >
      <control
        v-model="form.tanggalAmbilKunci"
        type="datetime-local"
        placeholder="Tanggal Ambil Kunci"
      />
    </field>

    <field
      label="Tanggal Kembali Kunci"
    >
      <control
        v-model="form.tanggalKembaliKunci"
        type="datetime-local"
        placeholder="Tanggal Kembali Kunci"
      />
    </field>
  </modal-box>
  <modal-box
    v-model="isModalConfirm"
    :large-title="'Konfirmasi Tutup Peminjaman #'+file.id"
    button="success"
    has-cancel
    @submit.prevent="tutup"
  >
    <p>Yakin tutup proses peminjaman ?</p>
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
        <th>Deskripsi Peminjaman</th>
        <th>Jenis Kendaraan</th>
        <th>Tanggal dibuat</th>
        <th>Tanggal peminjaman</th>
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
        <td data-label="Deskripsi Peminjaman">
          {{ client.deskripsi }}
        </td>
        <td data-label="Jenis Kendaraan">
          {{ jenis.find( n => n.id == client.jenisKendaraan).nama }}
        </td>
        <td data-label="Tanggal dibuat">
          <small
            class="text-gray-500 dark:text-gray-400"
          >{{ convertDate(client.dateCreated) }}</small>
        </td>
        <td data-label="Tanggal dibuat">
          <small
            class="text-gray-500 dark:text-gray-400"
          >{{ convertDate(client.tanggalPinjam) }}</small>
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
              v-if="client.tanggalAmbil && client.tanggalAmbilKunci && client.tanggalKembaliKunci"
              color="success"
              tooltip="Tutup peminjaman"
              :icon="mdiStickerCheck"
              small
              @click="openModalTutup(isModalConfirm = true, client)"
            />
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
