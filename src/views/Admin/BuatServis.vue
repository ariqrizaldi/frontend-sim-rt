<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import useValidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import DataService from '@/services/data.service'
import { toDate } from '@/helper.js'
import { mdiBallot } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import TitleBar from '@/components/TitleBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import HeroBar from '@/components/HeroBar.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import FilePicker from '@/components/FilePicker.vue'
import Divider from '@/components/Divider.vue'
// import TitledSection from '@/components/TitledSection.vue'
import { createToaster } from '@meforma/vue-toaster'

const toast = createToaster({
  position: 'top',
  duration: 2000
})

const titleStack = ref(['Admin', 'Permintaan Servis Kendaraan'])

const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetch', 'jenisKendaraans')
  store.dispatch('fetch', 'jenisServis')
  store.dispatch('fetch', 'servisKendaraans')
  store.dispatch('fetch', 'users')
  v$.value.$validate()
})

const pilihKendaraan = computed(() => store.getters.getJenisKendaraan)

const pilihJenisServis = computed(() => store.getters.getJenisServis)

const pilihPemegang = computed(() => store.getters.getUsers)

const ps = computed(() => store.getters.getServisKendaraan)

const form = reactive({
  jenisKendaraan: 1,
  jenisServis: 1,
  deskripsi: '',
  tanggal: '',
  pemegang: null
})

const rules = computed(() => {
  return {
    jenisKendaraan: { required: helpers.withMessage('Wajib memilih', required) },
    jenisServis: { required: helpers.withMessage('Wajib memilih', required) },
    deskripsi: { required: helpers.withMessage('Wajib diisi', required) },
    tanggal: { required: helpers.withMessage('Wajib diisi', required) },
    pemegang: { required: helpers.withMessage('Wajib memilih', required) }
  }
})

const resetForm = () => {
  form.jenisKendaraan = null
  form.jenisServis = null
  form.deskripsi = ''
  form.tanggal = ''
  form.pemegang = null
}

const v$ = useValidate(rules, form)

const submit = () => {
  const idNew = ps.value.at(-1).id + 1
  if (!v$.value.$error) {
    const data = {
      jenisKendaraan: form.jenisKendaraan,
      jenisServis: form.jenisServis,
      deskripsi: form.deskripsi,
      tanggalServis: toDate(form.tanggal),
      kategori: 'AKTIF',
      status: 'Proses servis',
      user: form.pemegang
    }
    DataService.create('/servisKendaraans', data)
      .then((response) => {
        store.dispatch('fetch', 'servisKendaraans')
        upload(idNew)
        toast.success('Berhasil membuat Servis Kendaraan baru')
        resetForm()
      })
      .catch(error => {
        toast.error(error.message)
      })
  } else toast('Isi form sesuai ketentuan')
}
const file = ref(null)

const uploadPercent = ref(0)

const progressEvent = progressEvent => {
  uploadPercent.value = Math.round(
    (progressEvent.loaded * 100) / progressEvent.total
  )
}

const upload = (id) => {
  const formData = new FormData()
  formData.append('file', file.value)
  DataService.upload('/servisKendaraans/upload/surat-jalan/', id, formData, progressEvent)
    .then(response => {
      toast.success('Berhasil Upload')
      uploadPercent.value = 0
    })
    .catch((error) => {
      uploadPercent.value = 0
      toast.error(error.message)
    })
  file.value = undefined
}

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar :icon="mdiBallot">
    Form Permintaan Servis Kendaraan
  </hero-bar>
  <main-section>
    <card-component
      title="Buat Servis"
      form
    >
      <field
        label="Jenis Servis"
        :error="v$.jenisServis.$error"
        :message="v$.jenisServis.$errors[0]"
      >
        <control
          v-model="form.jenisServis"
          :options="pilihJenisServis"
        />
      </field>
      <field
        label="Jenis Kendaraan"
        :error="v$.jenisKendaraan.$error"
        :message="v$.jenisKendaraan.$errors[0]"
      >
        <control
          v-model="form.jenisKendaraan"
          :options="pilihKendaraan"
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
        label="Tanggal Rencana Servis"
        :error="v$.tanggal.$error"
        :message="v$.tanggal.$errors[0]"
      >
        <control
          v-model="form.tanggal"
          type="datetime-local"
          placeholder="Tanggal"
        />
      </field>
      <field
        label="Pemegang"
        :error="v$.pemegang.$error"
        :message="v$.pemegang.$errors[0]"
      >
        <control
          v-model="form.pemegang"
          :options="pilihPemegang"
        />
      </field>
      <field
        label="Surat Jalan"
        help="File harus berformat pdf dengan size maksimal 2mb"
      >
        <file-picker v-model="file" />
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
          @click="resetForm"
        />
      </jb-buttons>
    </card-component>
  </main-section>
</template>
