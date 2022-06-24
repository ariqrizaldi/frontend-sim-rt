<script setup>
import { reactive, ref } from 'vue'
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

const form = reactive({
  login: '',
  pass: ''
})

const router = useRouter()

const isVisible = ref(false)

const submit = () => {
  router.push('/admin')
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
      <divider />
      <field
        label="Login"
        help="Masukkan nama anda"
      >
        <control
          v-model="form.login"
          :icon="mdiAccount"
          name="login"
          autocomplete="nama"
        />
      </field>

      <field
        label="Password"
        help="Masukkan password anda"
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
        <jb-button
          to="/home"
          color="info"
          outline
          label="Kembali"
        />
      </jb-buttons>
    </card-component>
  </full-screen-section>
</template>
