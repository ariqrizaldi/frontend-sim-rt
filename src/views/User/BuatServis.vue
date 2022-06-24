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
// import TitledSection from '@/components/TitledSection.vue'

const titleStack = ref(['User', 'Permintaan Servis Kendaraan'])

const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetch', 'jenisKendaraans')
  store.dispatch('fetch', 'jenisServis')
  store.dispatch('fetch', 'users')
  v$.value.$validate()
})

const pilihKendaraan = computed(() => store.getters.getJenisKendaraan)

const pilihJenisServis = computed(() => store.getters.getJenisServis)

const form = reactive({
  jenisKendaraan: 1,
  jenisServis: 1,
  deskripsi: '',
  tanggal: null
})

const rules = computed(() => {
  return {
    jenisKendaraan: { required: helpers.withMessage('Wajib memilih', required) },
    jenisServis: { required: helpers.withMessage('Wajib memilih', required) },
    deskripsi: { required: helpers.withMessage('Wajib diisi', required) },
    tanggal: { required: helpers.withMessage('Wajib diisi', required) }
  }
})

const resetForm = () => {
  form.jenisKendaraan = null
  form.jenisServis = null
  form.deskripsi = ''
  form.tanggal = ''
}

const v$ = useValidate(rules, form)

const submit = () => {
  if (!v$.value.$error) {
    const data = {
      jenisKendaraan: form.jenisKendaraan,
      jenisServis: form.jenisServis,
      deskripsi: form.deskripsi,
      tanggalServis: toDate(form.tanggal),
      kategori: 'MASUK',
      status: 'Perlu ditinjau',
      user: store.state.userId
    }
    console.log(data)
    DataService.create('/servisKendaraans', data)
      .then((response) => {
        store.dispatch('fetch', 'servisKendaraans')
        alert('Berhasil membuat Servis Kendaraan baru')
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
