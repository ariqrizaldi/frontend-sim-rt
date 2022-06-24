<script setup>
import { computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import useValidate from '@vuelidate/core'
import DataService from '@/services/data.service'
import { required, minLength, helpers } from '@vuelidate/validators'
import { mdiExport, mdiFilter, mdiPlus, mdiFileEdit } from '@mdi/js'
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
  checkable: Boolean,
  admin: Boolean
})

const store = useStore()

const lightBorderStyle = computed(() => store.state.lightBorderStyle)

const lightBgStyle = computed(() => store.state.lightBgStyle)

const tableTrStyle = computed(() => store.state.tableTrStyle)

const tableTrOddStyle = computed(() => store.state.tableTrOddStyle)

const darkMode = computed(() => store.state.darkMode)

const items = computed(() => store.getters.getKendaraan)

const pemegang = computed(() => store.getters.getUsers)

const jenis = computed(() => store.getters.getJenisKendaraan)

const isModalWarningActive = ref(false)

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
const emit = defineEmits(['click-create'])

const clickCreate = (event) => {
  emit('click-create', event)
}
const form = reactive({
  nama: '',
  noPlat: '',
  jenisKendaraan: null,
  pemegang: null
})

const rules = computed(() => {
  return {
    nama: {
      required: helpers.withMessage('Wajib diisi', required),
      minLength: helpers.withMessage(
        ({
          $invalid,
          $params
        }) => `Isian nama minimal mempunyai ${$params.min} karakter jadi isian ${$invalid ? 'belum sesuai' : 'sudah sesuai'}`,
        minLength(3)
      )
    },
    noPlat: { required: helpers.withMessage('Wajib diisi', required) },
    jenisKendaraan: { required: helpers.withMessage('Wajib memilih', required) }
  }
})
const v$ = useValidate(rules, form)

const openModalEdit = (isModalActive, item) => {
  if (isModalActive) {
    v$.value.$validate()
    form.id = item.id
    form.nama = item.nama
    form.noPlat = item.noPlat
    form.jenisKendaraan = item.jenisKendaraan
    form.pemegang = item.pemegang
  }
}

const update = () => {
  if (!v$.value.$error) {
    const data = {
      nama: form.nama,
      noPlat: form.noPlat,
      jenisKendaraan: form.jenisKendaraan,
      pemegang: form.pemegang,
      status: 'Tersedia'
    }
    DataService.update('/kendaraans/', form.id, data)
      .then(response => {
        console.log(response.data)
        alert('Telah diupdate')
        isModalWarningActive.value = false
        store.dispatch('fetch', 'kendaraans')
      })
      .catch(e => {
        alert(e.message)
      })
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
    v-model="isModalWarningActive"
    :large-title="'Edit Kendaraan #'+form.id"
    button="info"
    has-cancel
    @submit.prevent="update"
  >
    <field
      label="Nama"
      :error="v$.nama.$error"
      :message="v$.nama.$errors[0]"
    >
      <control
        v-model="form.nama"
        type="tel"
        placeholder="Isi dengan nama kendaraan"
      />
    </field>
    <field
      label="No Plat"
      :error="v$.noPlat.$error"
      :message="v$.noPlat.$errors[0]"
    >
      <control
        v-model="form.noPlat"
        type="tel"
        placeholder="Isi dengan no plat kendaraan"
      />
    </field>
    <field
      label="Jenis Kendaraan"
      :error="v$.jenisKendaraan.$error"
      :message="v$.jenisKendaraan.$errors[0]"
    >
      <control
        v-model="form.jenisKendaraan"
        :options="jenis"
      />
    </field>
    <field
      label="Pemegang"
    >
      <control
        v-model="form.pemegang"
        :options="pemegang"
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
        <th>Nama</th>
        <th>Pemegang</th>
        <th>No Plat</th>
        <th>Jenis Kendaraan</th>
        <th>Status</th>
        <th v-if="admin">
          Aksi
        </th>
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
        <td data-label="Nama">
          {{ client.nama }}
        </td>
        <td
          v-if="client.pemegang"
          data-label="Pemegang"
        >
          {{ pemegang.find( n => n.id == client.pemegang).nama }}
        </td>
        <td
          v-else
          data-label="Pemegang"
        >
          BPS RI
        </td>
        <td data-label="No Plat">
          {{ client.noPlat }}
        </td>
        <td data-label="Jenis Kendaraan">
          {{ jenis.find( n => n.id == client.jenisKendaraan).nama }}
        </td>
        <td
          data-label="Aktivasi"
        >
          <pill
            v-if="client.status === 'Tersedia'"
            type="success"
            :text="client.status"
            small
          />
          <pill
            v-else
            type="warning"
            :text="client.status"
            small
          />
        </td>
        <td
          v-if="admin"
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
