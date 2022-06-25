<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import useValidate from '@vuelidate/core'
import { required, minLength, numeric, helpers } from '@vuelidate/validators'
import { mdiClose } from '@mdi/js'
import DataService from '@/services/data.service'
import MainSection from '@/components/MainSection.vue'
// import Notification from '@/components/Notification.vue'
import BarangTable from '@/components/Table/Admin/BarangTable.vue'
import KelolaUnitBarangTable from '@/components/Table/Admin/KelolaUnitBarangTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import { createToaster } from '@meforma/vue-toaster'

const toast = createToaster({
  position: 'top',
  duration: 2000
})

const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetch', 'unitBarangs')
  store.dispatch('fetch', 'jenisBarangs')
  store.dispatch('fetch', 'barangs')
  vA$.value.$validate()
  vB$.value.$validate()
})

const titleStack = ref(['Admin', 'Kelola Unit Barang'])

const isCreate = ref(false)

const isCreateBarang = ref(false)

const pilihUnit = computed(() => store.getters.getUnitBarang)

const pilihJenis = computed(() => store.getters.getJenisBarang)

const form = reactive({
  nama: ''
})

const resetForm = () => {
  form.nama = ''
}

const rules = computed(() => {
  return {
    nama: { required: helpers.withMessage('Wajib diisi', required) }
  }
})

const formB = reactive({
  nama: '',
  minJumlah: null,
  jumlah: null,
  jenisBarang: null,
  unitBarang: null
})

const resetFormB = () => {
  form.nama = ''
  form.minJumlah = null
  form.jumlah = null
  form.jenisBarang = null
  form.unitBarang = null
}

const rulesB = computed(() => {
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
    minJumlah: {
      required: helpers.withMessage('Wajib diisi', required),
      numeric: helpers.withMessage('Isian harus dengan angka', numeric)
    },
    jumlah: {
      required: helpers.withMessage('Wajib diisi', required),
      numeric: helpers.withMessage('Isian harus dengan angka', numeric)
    },
    jenisBarang: { required: helpers.withMessage('Wajib memilih', required) },
    unitBarang: { required: helpers.withMessage('Wajib memilih', required) }
  }
})

const vA$ = useValidate(rules, form)

const vB$ = useValidate(rulesB, formB)

const submitForm = () => {
  if (!vA$.value.nama.$error) {
    const data = {
      nama: form.nama
    }
    DataService.create('/unitBarangs', data)
      .then((response) => {
        toast.success('Berhasil membuat Unit Barang baru')
        store.dispatch('fetch', 'unitBarangs')
        resetForm()
        window.location.reload()
      })
      .catch(error => {
        toast.error(error.message)
      })
  } else toast.error('Isi form sesuai ketentuan')
}

const submitFormB = () => {
  if (!vB$.value.nama.$error && !vB$.value.minJumlah.$error &&
  !vB$.value.jumlah.$error && !vB$.value.jenisBarang.$error && !vB$.value.unitBarang.$error) {
    const data = {
      nama: formB.nama,
      minJumlah: formB.minJumlah,
      jumlah: formB.jumlah,
      jenisBarang: formB.jenisBarang,
      unitBarang: formB.unitBarang
    }
    DataService.create('/barangs', data)
      .then((response) => {
        toast.success('Berhasil membuat Barang baru')
        store.dispatch('fetch', 'barangs')
        resetFormB()
        window.location.reload()
      })
      .catch(error => {
        toast.error(error.message)
      })
  } else toast.error('Isi form sesuai ketentuan')
}

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Kelola Unit Barang</hero-bar>
  <main-section>
    <card-component
      v-if="isCreateBarang"
      title="Buat barang baru"
      class="mb-4"
      :header-icon="mdiClose"
      form
      @header-icon-click="isCreateBarang = !isCreateBarang"
    >
      <field
        label="Nama"
        :error="vB$.nama.$error"
        :message="vB$.nama.$errors[0]"
      >
        <control
          v-model="formB.nama"
          type="tel"
          placeholder="Isi dengan nama kendaraan"
        />
      </field>
      <field
        label="Jumlah"
        :error="vB$.jumlah.$error"
        :message="vB$.jumlah.$errors[0]"
      >
        <control
          v-model="formB.jumlah"
          type="tel"
          placeholder="Isi dengan jumlah barang"
        />
      </field>
      <field
        label="Minimal Jumlah"
        :error="vB$.minJumlah.$error"
        :message="vB$.minJumlah.$errors[0]"
      >
        <control
          v-model="formB.minJumlah"
          type="tel"
          placeholder="Isi dengan minimal jumlah barang yang tersedia"
        />
      </field>
      <field
        label="Jenis Barang"
        :error="vB$.jenisBarang.$error"
        :message="vB$.jenisBarang.$errors[0]"
      >
        <control
          v-model="formB.jenisBarang"
          :options="pilihJenis"
        />
      </field>
      <field
        label="Unit Barang"
        :error="vB$.unitBarang.$error"
        :message="vB$.unitBarang.$errors[0]"
      >
        <control
          v-model="formB.unitBarang"
          :options="pilihUnit"
        />
      </field>
      <jb-buttons>
        <jb-button
          type="submit"
          color="info"
          label="Submit"
          @click="submitFormB"
        />
        <jb-button
          type="reset"
          color="info"
          outline
          label="Reset"
          @click="resetFormB"
        />
      </jb-buttons>
    </card-component>
    <card-component
      v-if="isCreate"
      title="Buat unit barang baru"
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
          v-model="form.nama"
          type="tel"
          placeholder="Isi dengan nama unit barang"
        />
      </field>
      <jb-buttons>
        <jb-button
          type="submit"
          color="info"
          label="Submit"
          @click="submitForm"
        />
        <jb-button
          type="reset"
          color="info"
          outline
          label="Reset"
          @click="resetForm"
        />
      </jb-buttons>
    </card-component>
    <div class="flex-inline md:flex">
      <card-component
        class="mb-6 flex-1"
        has-table
      >
        <barang-table
          admin
          @click-create="isCreateBarang=true"
        />
      </card-component>
      <card-component
        class="mb-6"
        has-table
      >
        <kelola-unit-barang-table @click-create="isCreate=true" />
      </card-component>
    </div>
  </main-section>
</template>
