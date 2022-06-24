<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import useValidate from '@vuelidate/core'
import DataService from '@/services/data.service'
import { required, helpers } from '@vuelidate/validators'
import { convertDate, toDate } from '@/helper.js'
import { mdiEye, mdiFileEdit, mdiTrashCan, mdiExport, mdiFilter, mdiUpload, mdiDownload, mdiPlusCircle } from '@mdi/js'
import SearchField from '@/components/SearchField.vue'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Pill from '@/components/Pill.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import FilePicker from '@/components/FilePicker.vue'
import Divider from '@/components/Divider.vue'

defineProps({
  checkable: Boolean
})

const store = useStore()

const lightBorderStyle = computed(() => store.state.lightBorderStyle)

const lightBgStyle = computed(() => store.state.lightBgStyle)

const tableTrStyle = computed(() => store.state.tableTrStyle)

const tableTrOddStyle = computed(() => store.state.tableTrOddStyle)

const darkMode = computed(() => store.state.darkMode)

const jenisKendaraan = computed(() => store.getters.getJenisKendaraan)

const jenisServis = computed(() => store.getters.getJenisServis)

const items = computed(() => store.getters.getServisByUser)

const isModalActive = ref(false)

const isModalWarningActive = ref(false)

const isModalBuktiActive = ref(false)

const isModalFeedbackActive = ref(false)

const isModalDangerActive = ref(false)

const isModalFilter = ref(false)

const isModalExport = ref(false)

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

const form = reactive({
  id: null,
  jenisKendaraan: null,
  jenisServis: null,
  deskripsi: '',
  tanggalServis: '',
  user: null,
  kategori: null,
  status: ''
})

const formUpload = reactive({
  id: null,
  file: undefined
})

const formFeedback = reactive({
  id: null,
  jenisKendaraan: null,
  jenisServis: null,
  deskripsi: '',
  tanggalServis: '',
  user: null,
  kategori: null,
  status: '',
  feedback: '',
  nilai: null
})

const pilihNilai = [
  { id: 5, nama: 'Sangat Puas' },
  { id: 4, nama: 'Puas' },
  { id: 3, nama: 'Cukup Puas' },
  { id: 2, nama: 'Tidak Puas' },
  { id: 1, nama: 'Sangat Tidak Puas' }
]

const rules = computed(() => {
  return {
    jenisKendaraan: { required: helpers.withMessage('Wajib memilih', required) },
    jenisServis: { required: helpers.withMessage('Wajib memilih', required) },
    deskripsi: { required: helpers.withMessage('Wajib diisi', required) },
    tanggalServis: { required: helpers.withMessage('Wajib diisi', required) }
  }
})

const rulesB = computed(() => {
  return {
    nilai: { required: helpers.withMessage('Wajib memilih', required) },
    feedback: { required: helpers.withMessage('Wajib diisi', required) }
  }
})

const v$ = useValidate(rules, form)

const vB$ = useValidate(rulesB, formFeedback)

const openModalEdit = (isModalActive, item) => {
  if (isModalActive) {
    v$.value.$validate()
    form.id = item.id
    form.user = item.user
    form.jenisServis = item.jenisServis
    form.jenisKendaraan = item.jenisKendaraan
    form.tanggalServis = item.tanggalServis
    form.deskripsi = item.deskripsi
    form.kategori = item.kategori
    form.status = item.status
  }
}
const openUploadForm = (isModalActive, item) => {
  if (isModalActive) {
    formUpload.id = item.id
  }
}

const openModalFeedbackForm = (isModalActive, item) => {
  if (isModalActive) {
    vB$.value.$validate()
    formFeedback.id = item.id
    formFeedback.user = item.user
    formFeedback.jenisServis = item.jenisServis
    formFeedback.jenisKendaraan = item.jenisKendaraan
    formFeedback.tanggalServis = item.tanggalServis
    formFeedback.status = item.status
    formFeedback.deskripsi = item.deskripsi
    formFeedback.kategori = item.kategori
  }
}

const openModalBatal = (isModalActive, item) => {
  if (isModalActive) {
    idServisBatal.value = item
  }
}

const idServisBatal = ref(0)

const openModalFeedback = (isModalActive, item) => {
  if (isModalActive) {
    form.nilai = item.nilai
    form.feedback = item.feedback
  }
}

const update = () => {
  if (!v$.value.$error) {
    const data = {
      jenisServis: form.jenisServis,
      jenisKendaraan: form.jenisKendaraan,
      tanggalServis: toDate(form.tanggalServis),
      deskripsi: form.deskripsi,
      kategori: form.kategori,
      user: form.user,
      status: form.status
    }
    DataService.update('/servisKendaraans/', form.id, data)
      .then(response => {
        console.log(response.data)
        alert('Telah diupdate')
        isModalWarningActive.value = false
        store.dispatch('fetch', 'servisKendaraans')
      })
      .catch(e => {
        alert(e.message)
      })
  } else alert('Isi form sesuai ketentuan')
}

const beriFeedback = () => {
  if (!vB$.value.$error) {
    const data = {
      jenisServis: formFeedback.jenisServis,
      jenisKendaraan: formFeedback.jenisKendaraan,
      tanggalServis: formFeedback.tanggalServis,
      deskripsi: formFeedback.deskripsi,
      asal: formFeedback.asal,
      status: formFeedback.status,
      kategori: formFeedback.kategori,
      user: formFeedback.user,
      nilai: formFeedback.nilai,
      feedback: formFeedback.feedback
    }
    DataService.update('/servisKendaraans/', formFeedback.id, data)
      .then(response => {
        console.log(response.data)
        isModalActive.value = false
        alert('Telah diupdate')
        store.dispatch('fetch', 'servisKendaraans')
      })
      .catch(e => {
        alert(e.message)
      })
  } else alert('Isi form sesuai ketentuan')
}

const batal = () => {
  const data = {
    status: 'Dibatalkan',
    kategori: 'SELESAI'
  }
  DataService.update('/servisKendaraans/update/', idServisBatal.value, data)
    .then(response => {
      console.log(response.data)
      store.dispatch('fetch', 'servisKendaraans')
      alert('Sukses dibatalkan')
      isModalDangerActive.value = false
      window.location.reload()
    })
    .catch(e => {
      alert(e.message)
    })
}

const uploadPercent = ref(0)

const progressEvent = progressEvent => {
  uploadPercent.value = Math.round(
    (progressEvent.loaded * 100) / progressEvent.total
  )
}

const upload = () => {
  const formData = new FormData()
  formData.append('file', formUpload.file)
  DataService.upload('/servisKendaraans/upload/bukti-servis/', formUpload.id, formData, progressEvent)
    .then(response => {
      alert('Berhasil mengunggah bukti servis')
      uploadPercent.value = 0
      isModalBuktiActive.value = false
    })
    .catch((error) => {
      uploadPercent.value = 0
      alert(error.message)
    })
  formUpload.file = undefined
}

</script>

<template>
  <modal-box
    v-model="isModalFeedbackActive"
    title="Ulasan Pelayanan"
    :has-submit="false"
  >
    <div class="text-gray-900 font-bold text-lg mb-2">
      Nilai pelayanan
    </div>
    <p> {{ form.nilai }} </p>
    <divider />
    <div class="text-gray-900 font-bold text-lg mb-2">
      Umpan balik pelayanan
    </div>
    <p> {{ form.feedback }} </p>
  </modal-box>
  <modal-box
    v-model="isModalDangerActive"
    :large-title="'Konfirmasi Batalkan Laporan #'+idServisBatal"
    button="danger"
    has-cancel
    @submit.prevent="batal"
  >
    <p class="text-lg">
      Apakah anda yakin untuk membatalkan laporan ?
    </p>
  </modal-box>
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
    v-model="isModalBuktiActive"
    :large-title="'Upload Bukti Servis #'+formUpload.id"
    button="info"
    has-cancel
    @submit.prevent="upload"
  >
    <divider />
    <field
      label="Bukti Servis"
      help="Ukuran file maksimal 2mb"
    >
      <file-picker v-model="formUpload.file" />
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
  <modal-box
    v-model="isModalWarningActive"
    :large-title="'Edit Permintaan Servis #'+form.id"
    button="info"
    has-cancel
    @submit.prevent="update"
  >
    <field
      label="Jenis Kendaraan"
      :error="v$.jenisServis.$error"
      :message="v$.jenisServis.$errors[0]"
    >
      <control
        v-model="form.jenisServis"
        :options="jenisServis"
      />
    </field>
    <field
      label="Jenis Kendaraan"
      :error="v$.jenisKendaraan.$error"
      :message="v$.jenisKendaraan.$errors[0]"
    >
      <control
        v-model="form.jenisKendaraan"
        :options="jenisKendaraan"
      />
    </field>
    <field
      label="Deskripsi Servis"
      :error="v$.deskripsi.$error"
      :message="v$.deskripsi.$errors[0]"
    >
      <control
        v-model="form.deskripsi"
        type="textarea"
        placeholder="Penjelasan spesifik terkait servis"
      />
    </field>
    <field
      label="Tanggal Servis"
      :error="v$.tanggalServis.$error"
      :message="v$.tanggalServis.$errors[0]"
    >
      <control
        v-model="form.tanggalServis"
        type="datetime-local"
        placeholder="Tanggal"
      />
    </field>
  </modal-box>
  <modal-box
    v-model="isModalActive"
    :large-title="'Beri Ulasan Pelayanan dari Laporan #'+formFeedback.id"
    button="info"
    has-cancel
    @submit.prevent="beriFeedback"
  >
    <field
      label="Nilai layanan"
      :error="vB$.nilai.$error"
      :message="vB$.nilai.$errors[0]"
    >
      <control
        v-model="formFeedback.nilai"
        :options="pilihNilai"
      />
    </field>
    <field
      label="Umpan balik layanan"
      :error="vB$.feedback.$error"
      :message="vB$.feedback.$errors[0]"
    >
      <control
        v-model="formFeedback.feedback"
        type="textarea"
        placeholder="Penjelasan spesifik terkait kerusakan"
      />
    </field>
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
  <div class="m-4 flex flex-wrap flex-auto">
    <search-field class="mr-2 lg:w-4/5 w-full" />
    <jb-buttons
      class="lg:mt-0 mt-4"
      type="justify-center"
      no-wrap
    >
      <jb-button
        color="light"
        label="Filter"
        :icon="mdiFilter"
        :outline="buttonsOutline"
        @click="isModalFilter= true"
      />
      <jb-button
        color="light"
        label="Export"
        :icon="mdiExport"
        :outline="buttonsOutline"
        @click="isModalExport = true"
      />
    </jb-buttons>
  </div>
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Deskripsi</th>
        <th>Jenis Servis</th>
        <th>Jenis Kendaraan</th>
        <th>Tanggal dibuat</th>
        <th>Tanggal servis</th>
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
        <td data-label="Deskripsi Servis">
          {{ client.deskripsi }}
        </td>
        <td data-label="Jenis Servis">
          {{ jenisServis.find( n => n.id == client.jenisServis).nama }}
        </td>
        <td data-label="Jenis Kendaraan">
          {{ jenisKendaraan.find( n => n.id == client.jenisKendaraan).nama }}
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
            v-if="client.status =='Perlu ditinjau'"
            type="danger"
            text="Belum ditinjau"
            small
            outline
          />
          <pill
            v-else-if="client.status =='Proses servis'"
            type="warning"
            :text="client.status"
            small
            outline
          />
          <pill
            v-else-if="client.status =='Selesai'"
            type="success"
            text="Selesai"
            small
            outline
          />
          <pill
            v-else
            type="danger"
            :text="client.status"
            small
            outline
          />
        </td>
        <td data-label="Aksi">
          <jb-buttons
            v-if="client.status =='Perlu ditinjau'"
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
            <jb-button
              color="danger"
              :icon="mdiTrashCan"
              tooltip="Batalkan laporan"
              small
              @click="openModalBatal(isModalDangerActive = true,client.id)"
            />
          </jb-buttons>
          <jb-buttons
            v-else-if="client.status =='Selesai'"
            type="justify-center"
            no-wrap
          >
            <jb-button
              v-if="client.feedback && client.nilai"
              color="success"
              tooltip="Lihat Ulasan"
              :icon="mdiEye"
              small
              @click="openModalFeedback( isModalFeedbackActive = true, client)"
            />
            <jb-button
              v-else
              color="info"
              tooltip="Beri Ulasan"
              :icon="mdiPlusCircle"
              small
              @click="openModalFeedbackForm( isModalActive = true, client)"
            />
          </jb-buttons>
          <jb-buttons
            v-else-if="client.status =='Proses servis'"
            type="justify-center"
            no-wrap
          >
            <jb-button
              v-if="client.hasSurat"
              color="success"
              tooltip="Unduh Surat Jalan"
              :icon="mdiDownload"
              small
              :href="client.urlSurat"
            />
            <jb-button
              v-if="client.namaBukti == null"
              color="info"
              tooltip="Unggah Bukti Servis"
              :icon="mdiUpload"
              small
              @click="openUploadForm( isModalBuktiActive = true, client)"
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
