<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import useValidate from '@vuelidate/core'
import DataService from '@/services/data.service'
import { required, numeric, helpers } from '@vuelidate/validators'
import { mdiExport, mdiPlus, mdiFileEdit } from '@mdi/js'
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

const items = computed(() => store.getters.getArusBarang)

const isModalWarningActive = ref(false)

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

const emit = defineEmits(['click-create'])

const clickCreate = (event) => {
  emit('click-create', event)
}

const jumlah = ref(0)

const pilihBarang = computed(() => store.getters.getBarang)

const pilihKategori = [
  { id: 'ARUS_MASUK', nama: 'Barang Masuk' },
  { id: 'ARUS_KELUAR', nama: 'Barang Keluar' }
]

const form = reactive({
  id: null,
  barang: 1,
  keterangan: '',
  kategori: 'ARUS_MASUK',
  jumlah: null,
  user: null
})

const rules = computed(() => {
  return {
    barang: {
      required: helpers.withMessage('Wajib diisi', required)
    },
    keterangan: { required: helpers.withMessage('Wajib diisi', required) },
    kategori: { required: helpers.withMessage('Wajib memilih', required) },
    jumlah: {
      required: helpers.withMessage('Wajib diisi', required),
      numeric: helpers.withMessage('Isian harus dengan angka', numeric)
    }
  }
})

const v$ = useValidate(rules, form)

const currentArus = ref('')

const getBarang = (id) => {
  return pilihBarang.value.find(p => p.id === id)
}
const openModalEdit = (isModalActive, item) => {
  if (isModalActive) {
    v$.value.$validate()
    form.id = item.id
    currentArus.value = item.kategori
    form.barang = item.barang
    form.keterangan = item.keterangan
    form.kategori = item.kategori
    form.jumlah = item.jumlah
    jumlah.value = item.jumlah
    form.umur = item.umur
  }
}

const update = () => {
  if (!v$.value.$error) {
    const data = {
      barang: form.barang,
      keterangan: form.keterangan,
      kategori: form.kategori,
      jumlah: parseInt(form.jumlah),
      user: store.state.auth.user.id
    }

    const barang = getBarang(data.barang)
    if (data.kategori === 'ARUS_MASUK') {
      if (data.kategori === currentArus.value && data.jumlah !== jumlah.value) {
        if (data.jumlah > jumlah.value) {
          const baru = computed(() => data.jumlah - jumlah.value)
          barang.jumlah += baru.value
        } else if (data.jumlah < jumlah.value) {
          const baru = computed(() => jumlah.value - data.jumlah)
          barang.jumlah -= baru.value
        }
      } else if (data.kategori !== currentArus.value) {
        barang.jumlah += (data.jumlah + jumlah.value)
      }
      DataService.update('/barangs/', data.barang, barang)
        .then(response => {
        })
        .catch(e => {
          toast.error(e.message)
        })
      DataService.update('/arusBarangs/', form.id, data)
        .then(response => {
          toast.success('Telah diupdate')
          isModalWarningActive.value = false
          store.dispatch('fetch', 'arusBarangs')
          window.location.reload()
        })
        .catch(e => {
          toast.error(e.message)
        })
    } else if (data.kategori === 'ARUS_KELUAR') {
      if (barang.jumlah >= (data.jumlah - jumlah.value)) {
        if (data.kategori === currentArus.value && data.jumlah !== jumlah.value) {
          if (data.jumlah > jumlah.value) {
            const baru = computed(() => data.jumlah - jumlah.value)
            barang.jumlah -= baru.value
          } else if (data.jumlah < jumlah.value) {
            const baru = computed(() => jumlah.value - data.jumlah)
            barang.jumlah += baru.value
          }
        } else if (data.kategori !== currentArus.value) {
          barang.jumlah -= (data.jumlah + jumlah.value)
        }
        DataService.update('/barangs/', data.barang, barang)
          .then(response => {
          })
          .catch(e => {
            toast.error(e.message)
          })
        DataService.update('/arusBarangs/', form.id, data)
          .then(response => {
            toast.success('Telah diupdate')
            isModalWarningActive.value = false
            store.dispatch('fetch', 'arusBarangs')
          })
          .catch(e => {
            toast.error(e.message)
          })
      } else {
        toast.error('Barang tidak cukup tersedia jumlahnya')
      }
    }
  }
}

</script>

<template>
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
    v-model="isModalWarningActive"
    :large-title="'Edit Jenis Kerusakan #'+form.id"
    button="info"
    has-cancel
    @submit.prevent="update"
  >
    <field
      label="Barang"
      :error="v$.barang.$error"
      :message="v$.barang.$errors[0]"
    >
      <control
        v-model="form.barang"
        :options="pilihBarang"
      />
    </field>
    <field
      label="Keterangan"
      :error="v$.keterangan.$error"
      :message="v$.keterangan.$errors[0]"
    >
      <control
        v-model="form.keterangan"

        placeholder="Isi dengan sebab barang masuk/keluar"
      />
    </field>
    <field
      label="Kategori Input"
      :error="v$.kategori.$error"
      :message="v$.kategori.$errors[0]"
    >
      <control
        v-model="form.kategori"
        :options="pilihKategori"
      />
    </field>
    <field
      label="Jumlah"
      :error="v$.jumlah.$error"
      :message="v$.jumlah.$errors[0]"
    >
      <control
        v-model="form.jumlah"

        placeholder="Isi dengan tambahan atau pengeluaran barang"
      />
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
        color="info"
        label="Tambah"
        :icon="mdiPlus"
        @click="clickCreate"
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
        <th>Barang</th>
        <th>Tanggal dibuat</th>
        <th>Jumlah</th>
        <th>Keterangan</th>
        <th>Kategori</th>
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
        <td data-label="Barang ">
          {{ pilihBarang.find( n => n.id == client.barang).nama }}
        </td>
        <td data-label="Tanggal dibuat">
          {{ convertDate(client.dateCreated) }}
        </td>
        <td
          data-label="Jumlah"
        >
          {{ client.jumlah }}
        </td>
        <td data-label="Keterangan">
          {{ client.keterangan }}
        </td>
        <td
          data-label="Kategori"
        >
          <pill
            v-if="client.kategori === 'ARUS_MASUK'"
            type="success"
            text="Barang Masuk"
            small
          />
          <pill
            v-else
            type="danger"
            text="Barang Keluar"
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
