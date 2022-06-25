<script setup>
import { ref, reactive, onMounted, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import useValidate from '@vuelidate/core'
import { createToaster } from '@meforma/vue-toaster'
import { required, helpers } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiEyeOff, mdiEye } from '@mdi/js'
import FullScreenSection from '@/components/FullScreenSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import CheckRadioPicker from '@/components/CheckRadioPicker.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import Divider from '@/components/Divider.vue'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'

const store = useStore()

const toast = createToaster({
  position: 'top',
  duration: 2000
})

onMounted(() => {
  // dispatch the fetch action which commits a mutation 'SET_ITEMS' to update
  v$.value.$validate()
})
onBeforeMount(() => {
  if (loggedIn.value) {
    router.go(-1)
  }
})

const form = reactive({
  nama: '',
  password: ''
})
const loggedIn = computed(() => store.state.auth.status.loggedIn)
const rules = computed(() => {
  return {
    nama: { required: helpers.withMessage('Wajib disi', required) },
    password: { required: helpers.withMessage('Wajib diisi', required) }
  }
})

const v$ = useValidate(rules, form)

const router = useRouter()

const isVisible = ref(false)

const submit = () => {
  if (!v$.value.$error) {
    const data = {
      nama: form.nama,
      password: form.password
    }
    store.dispatch('auth/login', data).then(
      (data) => {
        toast.success('Sukses Login')
        router.push('/profile')
      }, (error) => {
        toast.error('Login gagal ! ' + error.message)
      })
  } else toast.error('Isi form sesuai ketentuan')
}
</script>

<template>
  <full-screen-section
    v-slot="{ cardClass, cardRounded }"
    bg="login"
  >
    <card-component
      :class="cardClass"
      :rounded="cardRounded"
      form
      @submit.prevent="submit"
    >
      <div class="flex items-center justify-center">
        <p class="text-xl lg:text-2xl font-bold ">
          SIM-RT BPS RI
        </p>
      </div>
      <div class="flex items-center justify-center">
        <p class="text-lg lg:text-xl font-medium mb-4 ">
          Login
        </p>
      </div>
      <field
        label="Nama"
        help="Masukkan nama anda"
        :error="v$.nama.$error"
        :message="v$.nama.$errors[0]"
      >
        <control
          v-model="form.nama"
          :icon="mdiAccount"
          name="nama"
          autocomplete="nama"
        />
      </field>

      <field
        label="Password"
        help="Masukkan password anda"
        :error="v$.password.$error"
        :message="v$.password.$errors[0]"
      >
        <control
          v-model="form.password"
          :icon="isVisible ? mdiEye : mdiEyeOff"
          :type="isVisible ? 'text' : 'password'"
          name="password"
          autocomplete="current-password"
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
          label="Login"
        />
      </jb-buttons>
    </card-component>
  </full-screen-section>
</template>
