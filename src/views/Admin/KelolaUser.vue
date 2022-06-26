<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import DataService from '@/services/data.service'
import { mdiClose, mdiEyeOff, mdiEye } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
// import Notification from '@/components/Notification.vue'
import KelolaUserTable from '@/components/Table/Admin/KelolaUserTable.vue'
import CardComponent from '@/components/CardComponent.vue'
import useValidate from '@vuelidate/core'
import { required, minLength, numeric, email, helpers } from '@vuelidate/validators'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import Divider from '@/components/Divider.vue'
import { createToaster } from '@meforma/vue-toaster'

const toast = createToaster({
  position: 'top',
  duration: 2000
})

const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  store.dispatch('fetch', 'users')
  store.dispatch('fetch', 'roles')
  v$.value.$validate()
})

const titleStack = ref(['Admin', 'Kelola User'])

const isCreate = ref(false)

const isVisible = ref(false)

const pilihRole = computed(() => store.getters.getRoles)

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
    nip: { numeric: helpers.withMessage('Isian harus dengan angka', numeric) },
    email: {
      required: helpers.withMessage('Wajib diisi', required),
      email: helpers.withMessage('Isian belum sesuai dengan format alamat email', email)
    },
    password: {
      required: helpers.withMessage('Wajib diisi', required),
      minLength: helpers.withMessage(
        ({
          $invalid,
          $params
        }) => `Isian password minimal mempunyai ${$params.min} karakter jadi isian ${$invalid ? 'belum sesuai' : 'sudah sesuai'}`,
        minLength(6)
      )
    },
    noTelp: {
      required: helpers.withMessage('Wajib diisi', required),
      numeric: helpers.withMessage('Isian harus dengan angka', numeric),
      minLength: helpers.withMessage(
        ({
          $invalid,
          $params
        }) => `Isian no telepon minimal mempunyai ${$params.min} angka jadi isian ${$invalid ? 'belum sesuai' : 'sudah sesuai'}`,
        minLength(10)
      )
    },
    role: { required: helpers.withMessage('Wajib memilih minimal 1', required) }
  }
})

const form = reactive({
  nama: '',
  nip: '',
  email: '',
  password: '',
  noTelp: '',
  role: [],
  isEnable: true
})

const resetForm = () => {
  form.nama = ''
  form.nip = ''
  form.email = ''
  form.password = ''
  form.noTelp = ''
  form.role = []
}

const v$ = useValidate(rules, form)

const submit = () => {
  if (!v$.value.$error) {
    const data = {
      nama: form.nama,
      nip: form.nip,
      email: form.email,
      password: form.password,
      noTelp: form.noTelp,
      role: form.role,
      isEnable: true
    }
    DataService.create('/users', data)
      .then((response) => {
        store.dispatch('fetch', 'users')
        toast.success('Berhasil membuat user')
        resetForm()
        window.location.reload()
      })
      .catch(error => {
        toast.error(error.message)
      })
  }
}
</script>
<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Kelola User</hero-bar>
  <main-section>
    <card-component
      v-if="isCreate"
      title="Buat User"
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

          placeholder="Isi dengan nama pengguna"
        />
      </field>
      <field
        label="NIP"
        :error="v$.nip.$error"
        :message="v$.nip.$errors[0]"
      >
        <control
          v-model="form.nip"

          placeholder="Isi dengan NIP bagi pengguna Pegawai BPS RI"
        />
      </field>
      <field
        label="Email"
        :error="v$.email.$error"
        :message="v$.email.$errors[0]"
      >
        <control
          v-model="form.email"

          placeholder="Isi dengan Email yang benar"
        />
      </field>
      <field
        label="No Telepon"
        :error="v$.noTelp.$error"
        :message="v$.noTelp.$errors[0]"
      >
        <control
          v-model="form.noTelp"

          placeholder="Isi dengan no telepon"
        />
      </field>
      <field
        help="Untuk memilih >1 menggunakan ' ctrl + click ' pada option lain"
        label="Role"
        :error="v$.role.$error"
        :message="v$.role.$errors[0]"
      >
        <control
          v-model="form.role"
          :options="pilihRole"
          multiple
        />
      </field>
      <field
        label="Password"
        :error="v$.password.$error"
        :message="v$.password.$errors[0]"
      >
        <control
          v-model="form.password"
          :icon="isVisible ? mdiEye : mdiEyeOff"
          :type="isVisible ? 'text' : 'password'"
          name="password"
          autocomplete="current-password"
          placeholder="Silahkan masukan password"
        />
      </field>
      <check-radio-picker
        name="Lihat Password"
        :options="{ value: 'Lihat Password' }"
        @click-visible="isVisible = !isVisible"
      />
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
      <kelola-user-table @click-create="isCreate=true" />
    </card-component>
  </main-section>
</template>
