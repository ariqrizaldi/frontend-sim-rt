<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import useValidate from '@vuelidate/core'
import DataService from '@/services/data.service'
import { required, numeric, helpers } from '@vuelidate/validators'
import { mdiClose } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
// import Notification from '@/components/Notification.vue'
import KelolaArusBarangTable from '@/components/Table/Admin/KelolaArusBarangTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import Divider from '@/components/Divider.vue'

const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetch', 'kendaraans')
  store.dispatch('fetch', 'users')
  store.dispatch('fetch', 'arusBarangs')
  store.dispatch('fetch', 'barangs')
  v$.value.$validate()
})

const titleStack = ref(['Admin', 'Arus Barang'])

const isCreate = ref(false)

const pilihBarang = computed(() => store.getters.getBarang)

const pilihKategori = [
  { id: 'ARUS_MASUK', nama: 'Barang Masuk' },
  { id: 'ARUS_KELUAR', nama: 'Barang Keluar' }
]

const form = reactive({
  barang: 1,
  keterangan: '',
  kategori: 'ARUS_MASUK',
  jumlah: null
})

const rules = computed(() => {
  return {
    barang: {
      required: helpers.withMessage('Wajib diisi', required)
    },
    keterangan: { required: helpers.withMessage('Wajib diisi', required) },
    kategori: { required: helpers.withMessage('Wajib memilih', required) },
    jumlah: {
      required: helpers.withMessage('Wajib diisi', required),
      numeric: helpers.withMessage('Isian harus dengan angka', numeric)
    }
  }
})

const resetForm = () => {
  form.barang = ''
  form.keterangan = ''
  form.kategori = null
  form.jumlah = null
}

const getBarang = (id) => {
  return pilihBarang.value.find(p => p.id === id)
}

const v$ = useValidate(rules, form)

const submit = () => {
  if (!v$.value.barang.$error && !v$.value.keterangan.$error &&
  !v$.value.kategori.$error && !v$.value.jumlah.$error) {
    const data = {
      barang: form.barang,
      keterangan: form.keterangan,
      kategori: form.kategori,
      jumlah: parseInt(form.jumlah),
      user: store.state.userId
    }
    const barang = getBarang(data.barang)
    if (data.kategori === 'ARUS_MASUK') {
      barang.jumlah += data.jumlah
      DataService.update('/barangs/', data.barang, barang)
        .then(response => {
          console.log(response.data)
        })
        .catch(e => {
          alert(e.message)
        })
      DataService.create('/arusBarangs', data)
        .then((response) => {
          alert('Berhasil membuat record barang baru')
          resetForm()
          window.location.reload()
        })
        .catch(error => {
          alert(error.message)
        })
    } else if (data.kategori === 'ARUS_KELUAR') {
      if (barang.jumlah >= data.jumlah) {
        barang.jumlah -= data.jumlah
        DataService.update('/barangs/', data.barang, barang)
          .then(response => {
            console.log(response.data)
          })
          .catch(e => {
            alert(e.message)
          })
        DataService.create('/arusBarangs', data)
          .then((response) => {
            alert('Berhasil membuat record barang baru')
            resetForm()
          })
          .catch(error => {
            alert(error.message)
          })
      } else {
        alert('Barang tidak cukup tersedia jumlahnya')
      }
    }
  } else alert('Isi form sesuai ketentuan')
}
</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Kelola Arus barang</hero-bar>
  <main-section>
    <card-component
      v-if="isCreate"
      title="Buat Record Barang"
      class="mb-4"
      :header-icon="mdiClose"
      form
      @header-icon-click="isCreate = !isCreate"
    >
      <field
        label="Barang"
        :error="v$.barang.$error"
        :message="v$.barang.$errors[0]"
      >
        <control
          v-model="form.barang"
          :options="pilihBarang"
        />
      </field>
      <field
        label="Keterangan"
        :error="v$.keterangan.$error"
        :message="v$.keterangan.$errors[0]"
      >
        <control
          v-model="form.keterangan"
          type="tel"
          placeholder="Isi dengan sebab barang masuk/keluar"
        />
      </field>
      <field
        label="Kategori Input"
        :error="v$.kategori.$error"
        :message="v$.kategori.$errors[0]"
      >
        <control
          v-model="form.kategori"
          :options="pilihKategori"
        />
      </field>
      <field
        label="Jumlah"
        :error="v$.jumlah.$error"
        :message="v$.jumlah.$errors[0]"
      >
        <control
          v-model="form.jumlah"
          type="tel"
          placeholder="Isi dengan tambahan atau pengeluaran barang"
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
    <card-component
      class="mb-6"
      has-table
    >
      <kelola-arus-barang-table
        @click-create="isCreate=true"
      />
    </card-component>
  </main-section>
</template>
