<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import useValidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { mdiBallot } from '@mdi/js'
import DataService from '@/services/data.service'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import HeroBar from '@/components/HeroBar.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import Divider from '@/components/Divider.vue'
// import TitledSection from '@/components/TitledSection.vue'
import { createToaster } from '@meforma/vue-toaster'

const toast = createToaster({
  position: 'top',
  duration: 2000
})

const titleStack = ref(['User', 'Laporan Kerusakan'])

const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetch', 'jenisKerusakans')
  v$.value.$validate()
})

const pilihKerusakan = computed(() => store.getters.getJenisKerusakan)

const form = reactive({
  jenisKerusakan: 1,
  lokasi: '',
  deskripsi: '',
  user: store.state.auth.user.id
})

const rules = computed(() => {
  return {
    jenisKerusakan: { required: helpers.withMessage('Wajib memilih', required) },
    lokasi: { required: helpers.withMessage('Wajib diisi', required) },
    deskripsi: { required: helpers.withMessage('Wajib diisi', required) }
  }
})

const resetForm = () => {
  form.jenisKerusakan = ''
  form.lokasi = ''
  form.deskripsi = ''
}

const v$ = useValidate(rules, form)

const submit = () => {
  if (!v$.value.$error) {
    const data = {
      jenisKerusakan: form.jenisKerusakan,
      lokasi: form.lokasi,
      deskripsi: form.deskripsi,
      asal: 'Laporan',
      kategori: 'MASUK',
      status: 'Perlu ditinjau',
      user: form.user
    }
    DataService.create('/laporanKerusakans', data)
      .then((response) => {
        store.dispatch('fetch', 'laporanKerusakans')
        toast.success('Berhasil membuat Laporan Kerusakan baru')
        resetForm()
      })
      .catch(error => {
        toast.error(error.message)
      })
  } else toast.error('Isi form sesuai ketentuan')
}
</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar :icon="mdiBallot">
    Form Laporan Kerusakan
  </hero-bar>
  <main-section>
    <card-component
      title="Buat Laporan"
      form
    >
      <field
        label="Lokasi Kerusakan"
        :error="v$.lokasi.$error"
        :message="v$.lokasi.$errors[0]"
      >
        <control
          v-model="form.lokasi"
          type="text"
          placeholder="Tempat terjadi kerusakan"
        />
      </field>
      <field
        label="Jenis Kerusakan"
        :error="v$.jenisKerusakan.$error"
        :message="v$.jenisKerusakan.$errors[0]"
      >
        <control
          v-model="form.jenisKerusakan"
          :options="pilihKerusakan"
        />
      </field>
      <field
        label="Deskripsi Kerusakan"
        :error="v$.deskripsi.$error"
        :message="v$.deskripsi.$errors[0]"
      >
        <control
          v-model="form.deskripsi"
          type="textarea"
          placeholder="Penjelasan spesifik terkait kerusakan"
        />
      </field>
      <divider />
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
  </main-section>
</template>
