<script setup>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { convertDate } from '@/helper.js'
import { mdiEye, mdiExport, mdiFilter, mdiPlus } from '@mdi/js'
import SearchField from '@/components/SearchField.vue'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import Divider from '@/components/Divider.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Pill from '@/components/Pill.vue'
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

const items = computed(() => store.getters.getRiwayatPeminjaman)

const jenis = computed(() => store.getters.getJenisKendaraan)

const isModalActive = ref(false)

const isModalWarningActive = ref(false)

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
    large-title="Konfirmasi Hapus"
    button="danger"
    has-cancel
  >
    <p class="text-lg">
      Apakah anda yakin untuk menghapusnya ?
    </p>
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
        <th>Deskripsi Peminjaman</th>
        <th>Jenis Kendaraan</th>
        <th>Tanggal pinjam</th>
        <th>Nilai layanan</th>
        <th>Feedback</th>
        <th>Status</th>
        <th>Detail</th>
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
        <td data-label="Jenis Peminjaman">
          {{ jenis.find( n => n.id == client.jenisKendaraan).nama }}
        </td>
        <td data-label="Tanggal pinjam">
          <small
            class="text-gray-500 dark:text-gray-400"
          >{{ convertDate(client.tanggalPinjam) }}</small>
        </td>
        <td data-label="Nilai">
          <div v-if="client.nilai ">
            {{ client.nilai }}
          </div>
          <small
            v-else-if="client.status === 'Selesai' "
            class="text-gray-500 dark:text-gray-400"
          > Belum ada </small>
          <small
            v-else
            class="text-gray-500 dark:text-gray-400"
          > Tidak ada </small>
        </td>
        <td data-label="Feedback">
          <div v-if="client.feedback">
            {{ client.feedback }}
          </div>
          <small
            v-else-if="client.status === 'Selesai' "
            class="text-gray-500 dark:text-gray-400"
          > Belum ada </small>
          <small
            v-else
            class="text-gray-500 dark:text-gray-400"
          > Tidak ada </small>
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
            v-if="client.status === 'Selesai' "
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
          <small
            v-else
            class="text-gray-500 dark:text-gray-400"
          > Tidak ada detail </small>
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
