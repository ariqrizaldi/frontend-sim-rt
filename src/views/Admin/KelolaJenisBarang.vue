<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import useValidate from '@vuelidate/core'
import DataService from '@/services/data.service'
import { required, minLength, helpers } from '@vuelidate/validators'
import { mdiClose } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
// import Notification from '@/components/Notification.vue'
import KelolaBarangTable from '@/components/Table/Admin/KelolaBarangTable.vue'
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
  store.dispatch('fetch', 'jenisBarangs')
  v$.value.$validate()
})

const titleStack = ref(['Admin', 'Kelola Jenis Barang'])

const isCreate = ref(false)

const form = reactive({
  nama: '',
  deskripsi: ''
})

const resetForm = () => {
  form.nama = ''
  form.deskripsi = ''
}

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

const submit = () => {
  if (!v$.value.nama.$error) {
    const data = {
      nama: form.nama,
      deskripsi: form.deskripsi
    }
    DataService.create('/jenisBarangs', data)
      .then((response) => {
        toast.success('Berhasil membuat Jenis Barang baru')
        store.dispatch('fetch', 'jenisBarangs')
        resetForm()
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
  <hero-bar>Kelola Jenis Barang</hero-bar>
  <main-section>
    <card-component
      v-if="isCreate"
      title="Buat jenis barang baru"
      class="mb-4"
      :header-icon="mdiClose"
      form
      @header-icon-click="isCreate = !isCreate"
    >
      <field
        label="Nama"
        :error="v$.nama.$error"
        :message="v$.nama.$errors[0]"
      >
        <control
          v-model="form.nama"
          type="text"
          placeholder="Isi dengan jenis barang"
        />
      </field>
      <field label="Deskripsi">
        <control
          v-model="form.deskripsi"
          type="textarea"
          placeholder="Isi dengan penjelasan terkait jenis barang"
        />
      </field>
      <jb-buttons>
        <jb-button
          type="submit"
          color="info"
          label="Submit"
          @click.prevent="submit"
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
    <card-component
      class="mb-6"
      has-table
    >
      <kelola-barang-table @click-create="isCreate=true" />
    </card-component>
  </main-section>
</template>
