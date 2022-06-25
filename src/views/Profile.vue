<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
// import { useStore } from 'vuex'
import { mdiAccountCircle, mdiLock, mdiAsterisk, mdiFormTextboxPassword } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import Divider from '@/components/Divider.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
import NavBar from '@/components/NavBar.vue'
// import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'
// const store = useStore()

const store = useStore()

const currentUser = computed(() => store.state.auth.user)

const titleStack = ref(['Profile Pengguna'])

const passwordForm = reactive({
  password_current: '',
  password: '',
  password_confirmation: ''
})
const check = (authorize) => {
  return currentUser.value.roles.includes(authorize)
}
const submitPass = () => {
  //
}
</script>

<template class="pt-14">
  <nav-bar aside />
  <title-bar :title-stack="titleStack" />
  <main-section>
    <div class="flex leading-tight flex-row items-center mb-6 justify-center">
      <card-component
        v-if="check('ROLE_STAFF')"
        title="Akses Staff"
        :icon="mdiAccountCircle"
      >
        <jb-buttons type="justify-center">
          <jb-button
            to="/staff"
            type="submit"
            color="success"
            label="Menuju ke Dashboard Staff"
          />
        </jb-buttons>
      </card-component>
      <card-component
        v-if="check('ROLE_ADMIN')"
        title="Akses Admin"
        :icon="mdiAccountCircle"
      >
        <jb-buttons type="justify-center">
          <jb-button
            to="/admin"
            type="submit"
            color="success"
            label="Menuju ke Dashboard Admin"
          />
        </jb-buttons>
      </card-component>
      <card-component
        v-if="check('ROLE_USER')"
        title="Akses User"
        :icon="mdiAccountCircle"
      >
        <jb-buttons type="justify-center">
          <jb-button
            to="/user"
            type="submit"
            color="success"
            label="Menuju ke Halaman Pengguna"
          />
        </jb-buttons>
      </card-component>
      <card-component
        v-if="check('ROLE_ADMINGUDANG')"
        title="Akses Admin Gudang"
        :icon="mdiAccountCircle"
      >
        <jb-buttons type="justify-center">
          <jb-button
            to="/admin-gudang"
            type="submit"
            color="success"
            label="Menuju ke Dashboard Admin Gudang"
          />
        </jb-buttons>
      </card-component>
      <card-component
        v-if="check('ROLE_TEKNISI')"
        title="Akses Teknisi"
        :icon="mdiAccountCircle"
      >
        <jb-buttons type="justify-center">
          <jb-button
            to="/teknisi"
            type="submit"
            color="success"
            label="Menuju ke Halaman Pekerjaan"
          />
        </jb-buttons>
      </card-component>
      <card-component
        v-if="check('ROLE_SOPIR')"
        title="Akses Sopir"
        :icon="mdiAccountCircle"
      >
        <jb-buttons type="justify-center">
          <jb-button
            to="/sopir"
            type="submit"
            color="success"
            label="Menuju ke Halaman Pekerjaan"
          />
        </jb-buttons>
      </card-component>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <card-component
          class="mb-4"
          title="Profil Anda"
          :icon="mdiAccountCircle"
        >
          <field>
            <div class="flex leading-tight items-end text-lg md:text-xl text-gray-800 font-semibold">
              Id User
            </div>
            <div class="flex leading-tight items-end text-lg md:text-xl text-gray-600 font-medium">
              {{ currentUser.id }}
            </div>
          </field>
          <field>
            <h2 class="flex leading-tight items-end text-lg md:text-xl text-gray-800 font-semibold">
              Nama User
            </h2>
            <h3 class="flex leading-tight items-end text-md md:text-lg text-gray-600 font-medium">
              {{ currentUser.username }}
            </h3>
          </field>
          <field>
            <h2 class="flex leading-tight items-end text-lg md:text-xl text-gray-800 font-semibold">
              Email User
            </h2>
            <h3 class="flex leading-tight items-end text-md md:text-lg text-gray-600 font-medium">
              {{ currentUser.email }}
            </h3>
          </field>
          <field>
            <h2 class="flex leading-tight items-end text-lg md:text-xl text-gray-800 font-semibold">
              Role User
            </h2>
            <h3 class="flex leading-tight items-end text-md md:text-lg text-gray-600 font-medium">
              <ul>
                <li
                  v-for="role in currentUser.roles"
                  :key="role"
                >
                  {{ role }}
                </li>
              </ul>
            </h3>
          </field>
          <divider />
        </card-component>
        <card-component
          title="Ubah Profil"
          :icon="mdiLock"
          form
          @submit.prevent="submitPass"
        >
          <field
            label="Nama"
          >
            <control
              v-model="passwordForm.password_current"
              name="nama"
              type="tel"
            />
          </field>
          <field
            label="Email"
          >
            <control
              name="password"
              type="tel"
            />
          </field>
          <jb-buttons>
            <jb-button
              type="submit"
              color="info"
              label="Submit"
              disabled
            />
          </jb-buttons>
        </card-component>
      </div>

      <div>
        <card-component
          title="Ubah Password"
          :icon="mdiLock"
          form
          @submit.prevent="submitPass"
        >
          <field
            label="Current password"
            help="Required. Your current password"
          >
            <control
              v-model="passwordForm.password_current"
              :icon="mdiAsterisk"
              name="password_current"
              type="password"
              required
              autocomplete="current-password"
            />
          </field>

          <divider />

          <field
            label="New password"
            help="Required. New password"
          >
            <control
              v-model="passwordForm.password"
              :icon="mdiFormTextboxPassword"
              name="password"
              type="password"
              required
              autocomplete="new-password"
            />
          </field>

          <field
            label="Confirm password"
            help="Required. New password one more time"
          >
            <control
              v-model="passwordForm.password_confirmation"
              :icon="mdiFormTextboxPassword"
              name="password_confirmation"
              type="password"
              required
              autocomplete="new-password"
            />
          </field>

          <divider />

          <jb-buttons>
            <jb-button
              type="submit"
              color="info"
              label="Submit"
              disabled
            />
          </jb-buttons>
        </card-component>
      </div>
    </div>
  </main-section>
  <footer-bar />
</template>
