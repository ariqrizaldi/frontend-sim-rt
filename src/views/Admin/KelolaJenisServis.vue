<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import useValidate from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import { mdiClose } from '@mdi/js'
import DataService from '@/services/data.service'
import MainSection from '@/components/MainSection.vue'
// import Notification from '@/components/Notification.vue'
import KelolaServisTable from '@/components/Table/Admin/KelolaServisTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'

const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetch', 'jenisServis')
  v$.value.$validate()
})

const titleStack = ref(['Admin', 'Kelola Jenis Servis'])

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
    console.log(data)
    DataService.create('/jenisServis', data)
      .then((response) => {
        alert('Berhasil membuat Jenis Servis baru')
        store.dispatch('fetch', 'jenisServis')
        resetForm()
      })
      .catch(error => {
        alert(error.message)
      })
  } else alert('Isi form sesuai ketentuan')
}
</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Kelola Jenis Servis</hero-bar>
  <main-section>
    <card-component
      v-if="isCreate"
      title="Buat jenis servis kendaraan baru"
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
          type="tel"
          placeholder="Isi dengan jenis servis"
        />
      </field>
      <field label="Deskripsi">
        <control
          v-model="form.deskripsi"
          type="tel"
          placeholder="Isi dengan penjelasan terkait jenis servis"
        />
      </field>
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
          @click="resetForm"
        />
      </jb-buttons>
    </card-component>
    <card-component
      class="mb-6"
      has-table
    >
      <kelola-servis-table @click-create="isCreate=true" />
    </card-component>
  </main-section>
</template>
