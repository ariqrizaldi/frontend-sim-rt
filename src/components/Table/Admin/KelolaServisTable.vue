<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import useValidate from '@vuelidate/core'
import DataService from '@/services/data.service'
import { required, minLength, helpers } from '@vuelidate/validators'
import { mdiPlus, mdiFileEdit } from '@mdi/js'
// import { convertDate } from '@/helper.js'
import SearchField from '@/components/SearchField.vue'
import ModalBox from '@/components/ModalBox.vue'
import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
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

const items = computed(() => store.getters.getJenisServis)

const isModalWarningActive = ref(false)

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

const form = reactive({
  id: '',
  nama: '',
  deskripsi: ''
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
    }
  }
})

const v$ = useValidate(rules, form)

v$.value.$validate()

const openModalEdit = (isModalActive, item) => {
  if (isModalActive) {
    v$.value.$validate()
    form.id = item.id
    form.nama = item.nama
    form.deskripsi = item.deskripsi
  }
}

const update = () => {
  if (!v$.value.$error) {
    const data = {
      nama: form.nama,
      deskripsi: form.deskripsi
    }
    DataService.update('/jenisServis/', form.id, data)
      .then(response => {
        toast.success('Telah diupdate')
        isModalWarningActive.value = false
        store.dispatch('fetch', 'jenisServis')
        window.location.reload()
      })
      .catch(e => {
        toast.error(e.message)
      })
  }
}
</script>
<template>
  <modal-box
    v-model="isModalWarningActive"
    :large-title="'Edit Jenis Servis #'+form.id"
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
        placeholder="Isi dengan jenis servis"
      />
    </field>
    <field label="Deskripsi">
      <control
        v-model="form.deskripsi"
        type="textarea"
        placeholder="Isi dengan penjelasan terkait jenis servis"
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
    </jb-buttons>
  </div>
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Nama</th>
        <th>Deskripsi</th>
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
        <td data-label="Nama">
          {{ client.nama }}
        </td>
        <td data-label="Deskripsi">
          {{ client.deskripsi }}
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
