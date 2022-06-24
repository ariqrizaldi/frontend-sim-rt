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
import Divider from '@/components/Divider.vue'
import FilePicker from '@/components/FilePicker.vue'
// import TitledSection from '@/components/TitledSection.vue'
import { createToaster } from '@meforma/vue-toaster'

const toast = createToaster({
  position: 'top',
  duration: 2000
})

const titleStack = ref(['User', 'Peminjaman Kendaraan'])

const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetch', 'jenisKendaraans')
  store.dispatch('fetch', 'peminjamanKendaraans')
  v$.value.$validate()
})

const file = ref(null)

const pilihKendaraan = computed(() => store.getters.getJenisKendaraan)

const pk = computed(() => store.getters.getPeminjamanKendaraan)

const form = reactive({
  jenisKendaraan: 1,
  deskripsi: '',
  tanggal: '',
  user: store.state.userId
})

const uploadPercent = ref(0)

const progressEvent = progressEvent => {
  uploadPercent.value = Math.round(
    (progressEvent.loaded * 100) / progressEvent.total
  )
}

const upload = (id) => {
  const formData = new FormData()
  formData.append('file', file.value)
  DataService.upload('/peminjamanKendaraans/upload/', id, formData, progressEvent)
    .then(response => {
      toast.success('Berhasil membuat Peminjaman Kendaraan baru')
      uploadPercent.value = 0
    })
    .catch((error) => {
      uploadPercent.value = 0
      toast.success(error.message)
    })
  file.value = undefined
}

const rules = computed(() => {
  return {
    jenisKendaraan: { required: helpers.withMessage('Wajib memilih', required) },
    deskripsi: { required: helpers.withMessage('Wajib diisi', required) },
    tanggal: { required: helpers.withMessage('Wajib diisi', required) }
  }
})

const resetForm = () => {
  form.jenisKendaraan = null
  form.deskripsi = ''
  form.tanggal = ''
}

const v$ = useValidate(rules, form)

const submit = () => {
  const idNew = pk.value.at(-1).id + 1
  if (!v$.value.$error) {
    const data = {
      jenisKendaraan: form.jenisKendaraan,
      deskripsi: form.deskripsi,
      tanggalPinjam: toDate(form.tanggal),
      kategori: 'MASUK',
      status: 'Perlu ditinjau',
      user: form.user
    }
    DataService.create('/peminjamanKendaraans', data)
      .then((response) => {
        store.dispatch('fetch', 'peminjamanKendaraans')
        upload(idNew)
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
    Form Permintaan Peminjaman Kendaraan
  </hero-bar>
  <main-section>
    <card-component
      title="Buat Peminjaman"
      form
    >
      <p>{{ last }}</p>
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
        label="Deskripsi Peminjaman"
        :error="v$.deskripsi.$error"
        :message="v$.deskripsi.$errors[0]"
      >
        <control
          v-model="form.deskripsi"
          type="textarea"
          placeholder="Penjelasan spesifik terkait peminjaman"
        />
      </field>
      <field
        label="Tanggal Peminjaman"
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
        label="Surat Tugas"
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
