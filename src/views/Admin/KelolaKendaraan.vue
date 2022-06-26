<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import useValidate from '@vuelidate/core'
import DataService from '@/services/data.service'
import { required, minLength, helpers } from '@vuelidate/validators'
import { mdiClose } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
// import Notification from '@/components/Notification.vue'
import KelolaUnitKendaraanTable from '@/components/Table/Admin/KelolaUnitKendaraanTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import Divider from '@/components/Divider.vue'
import { createToaster } from '@meforma/vue-toaster'

const toast = createToaster({
  position: 'top',
  duration: 2000
})

const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetch', 'kendaraans')
  store.dispatch('fetch', 'jenisKendaraans')
  store.dispatch('fetch', 'users')
  vA$.value.$validate()
})

const titleStack = ref(['Admin', 'Kelola Unit Kendaraan'])

const isCreate = ref(false)

const pilihPemegang = computed(() => store.getters.getUsers)

const pilihJenis = computed(() => store.getters.getJenisKendaraan)

const statusKendaraan = [
  { id: 'Milik pribadi', nama: 'Milik pribadi' },
  { id: 'Tersedia', nama: 'Tersedia' },
  { id: 'Tidak Tersedia', nama: 'Tidak Tersedia' }
]

const formAdd = reactive({
  nama: '',
  noPlat: '',
  jenisKendaraan: null,
  pemegang: null,
  status: ''
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
    jenisKendaraan: { required: helpers.withMessage('Wajib memilih', required) },
    status: { required: helpers.withMessage('Wajib memilih', required) }
  }
})

const resetformAdd = () => {
  formAdd.nama = ''
  formAdd.noPlat = ''
  formAdd.jenisKendaraan = null
  formAdd.pemegang = null
  formAdd.status = null
}

const vA$ = useValidate(rules, formAdd)

const submit = () => {
  if ((!vA$.value.nama.$error && !vA$.value.noPlat.$error && !vA$.value.jenisKendaraan.$error && !vA$.value.status.$error)) {
    const data = {
      nama: formAdd.nama,
      noPlat: formAdd.noPlat,
      jenisKendaraan: formAdd.jenisKendaraan,
      pemegang: formAdd.pemegang,
      status: formAdd.status
    }
    DataService.create('/kendaraans', data)
      .then((response) => {
        toast.success('Berhasil membuat Kendaraan baru')
        store.dispatch('fetch', 'kendaraans')
        resetformAdd()
        window.location.reload()
      })
      .catch(error => {
        toast.error(error.message)
      })
  } else { toast.error('Isi form sesuai ketentuan') }
}
</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Kelola Unit Kendaraan</hero-bar>
  <main-section>
    <card-component
      v-if="isCreate"
      title="Buat Unit Kendaraan"
      class="mb-4"
      :header-icon="mdiClose"
      form
      @header-icon-click="isCreate = !isCreate"
    >
      <field
        label="Nama"
        :error="vA$.nama.$error"
        :message="vA$.nama.$errors[0]"
      >
        <control
          v-model="formAdd.nama"

          placeholder="Isi dengan nama kendaraan"
        />
      </field>
      <field
        label="No Plat"
        :error="vA$.noPlat.$error"
        :message="vA$.noPlat.$errors[0]"
      >
        <control
          v-model="formAdd.noPlat"

          placeholder="Isi dengan no plat kendaraan"
        />
      </field>
      <field
        label="Jenis Kendaraan"
        :error="vA$.jenisKendaraan.$error"
        :message="vA$.jenisKendaraan.$errors[0]"
      >
        <control
          v-model="formAdd.jenisKendaraan"
          :options="pilihJenis"
        />
      </field>
      <field
        label="Pemegang"
      >
        <control
          v-model="formAdd.pemegang"
          :options="pilihPemegang"
        />
      </field>
      <field
        label="Status Kendaraan"
        :error="vA$.status.$error"
        :message="vA$.status.$errors[0]"
      >
        <control
          v-model="formAdd.status"
          :options="statusKendaraan"
        />
      </field>
      <divider />
      <jb-buttons>
        <jb-button
          type="submit"
          color="info"
          label="Submit"
          @click="submit"
        />
        <jb-button
          type="reset"
          color="info"
          outline
          label="Reset"
          @click="resetformAdd"
        />
      </jb-buttons>
    </card-component>
    <card-component
      class="mb-6"
      has-table
    >
      <kelola-unit-kendaraan-table
        admin
        @click-create="isCreate=true"
      />
    </card-component>
  </main-section>
</template>
