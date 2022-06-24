<script setup>
import { computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import useValidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import DataService from '@/services/data.service'
import { mdiExport, mdiFilter, mdiPlus, mdiCheckBold, mdiCloseThick, mdiDownload } from '@mdi/js'
import { convertDate } from '@/helper.js'
import SearchField from '@/components/SearchField.vue'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
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

const items = computed(() => store.getters.getPeminjamanKendaraanMasuk)

const peminjam = computed(() => store.getters.getUsers)

const sopir = computed(() => store.getters.getSopir)

const kendaraan = computed(() => store.getters.getKendaraanTersedia)

const jenis = computed(() => store.getters.getJenisKendaraan)

const isModalFilter = ref(false)

const isModalExport = ref(false)

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
const emit = defineEmits(['click-create'])

const clickCreate = (event) => {
  emit('click-create', event)
}
const idPeminjamanBatal = ref(0)

const openModalBatal = (isModalActive, item) => {
  if (isModalActive) {
    idPeminjamanBatal.value = item
  }
}

const batal = () => {
  const data = {
    status: 'Ditolak',
    kategori: 'SELESAI'
  }
  DataService.update('/peminjamanKendaraans/update/', idPeminjamanBatal.value, data)
    .then(response => {
      alert('Sukses ditolak')
      isModalDangerActive.value = false
      window.location.reload()
    })
    .catch(e => {
      alert(e.message)
    })
}

const form = reactive({
  peminjaman: null,
  sopir: undefined,
  kendaraan: undefined
})
const rules = computed(() => {
  return {
    kendaraan: { required: helpers.withMessage('Wajib diisi', required) }
  }
})

const v$ = useValidate(rules, form)

const openModalAgree = (isModalActive, item) => {
  if (isModalActive) {
    v$.value.$validate()
    form.peminjaman = item
  }
}
const submit = () => {
  if (!v$.value.$error) {
    const data = {
      status: 'Proses peminjaman',
      kategori: 'AKTIF'
    }
    const info = {
      sopir: form.sopir,
      peminjaman: form.peminjaman,
      kendaraan: form.kendaraan,
      statusKendaraan: 'Dipinjam'
    }
    const status = {
      status: 'Tidak tersedia'
    }
    DataService.create('/pesananKendaraans', info)
      .then((response) => {
        store.dispatch('fetch', 'pesananKendaraans')
        DataService.update('/kendaraans/update/', form.kendaraan, status)
          .then(response => {
            console.log('Sukses')
          })
          .catch(e => {
            alert(e.message)
          })
        DataService.update('/peminjamanKendaraans/update/', form.peminjaman, data)
          .then(response => {
            alert('Sukses ditindaklanjuti')
            isModalSuccessActive.value = false
            window.location.reload()
          })
          .catch(e => {
            alert(e.message)
          })
      })
      .catch(error => {
        alert(error.message)
      })
  } else alert('Isi form sesuai ketentuan')
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
    v-model="isModalSuccessActive"
    :large-title="'Tindak Lanjut Peminjaman #'+form.peminjaman"
    button="success"
    has-cancel
    @submit.prevent="submit"
  >
    <field
      label="Pilih Sopir"
    >
      <control
        v-model="form.sopir"
        :options="sopir"
      />
    </field>
    <field
      label="Pilih Kendaraan"
      :error="v$.kendaraan.$error"
      :message="v$.kendaraan.$errors[0]"
    >
      <control
        v-model="form.kendaraan"
        :options="kendaraan"
      />
    </field>
  </modal-box>
  <modal-box
    v-model="isModalDangerActive"
    :large-title="'Konfirmasi Tolak Peminjaman #'+idPeminjamanBatal"
    button="danger"
    has-cancel
    @submit.prevent="batal"
  >
    <p class="text-lg">
      Apakah anda yakin untuk tidak menindaklanjuti peminjaman ini?
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
        <th>Tanggal dibuat</th>
        <th>Tanggal peminjaman</th>
        <th>Peminjam</th>
        <th>Status</th>
        <th>Surat Tugas</th>
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
        <td data-label="Tanggal dibuat">
          <small
            class="text-gray-500 dark:text-gray-400"
          >{{ convertDate(client.dateCreated) }}</small>
        </td>
        <td data-label="Tanggal pinjam">
          <small
            class="text-gray-500 dark:text-gray-400"
          >{{ convertDate(client.tanggalPinjam) }}</small>
        </td>
        <td data-label="Peminjam">
          {{ peminjam.find( n => n.id == client.user).nama }}
        </td>
        <td data-label="Status">
          <pill
            type="danger"
            :text="client.status"
            small
          />
        </td>
        <td data-label="Surat Tugas">
          <jb-buttons
            type="justify-center"
            no-wrap
          >
            <jb-button
              v-if="client.hasSurat"
              color="success"
              tooltip="Unduh surat tugas"
              :icon="mdiDownload"
              small
              :href="client.url"
            />
          </jb-buttons>
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
              tooltip="Tindak Lanjut"
              small
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
