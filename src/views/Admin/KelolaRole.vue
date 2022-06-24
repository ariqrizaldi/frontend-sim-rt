<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import MainSection from '@/components/MainSection.vue'
import KelolaRoleTable from '@/components/Table/Admin/KelolaRoleTable.vue'
// import SearchField from '@/components/SearchField.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
// import JbButtons from '@/components/JbButtons.vue'
// import JbButton from '@/components/JbButton.vue'
// import Field from '@/components/Field.vue'
// import Control from '@/components/Control.vue'

const titleStack = ref(['Admin', 'Daftar Role'])

const store = useStore()

onMounted(() => {
  // dispatch the fetch action which commits a mutation fetch by 'SET_ITEMS' to update
  store.dispatch('fetch', 'roles')
})

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <hero-bar>Daftar Role</hero-bar>
  <main-section>
    <card-component
      class="mb-6"
      has-table
    >
      <kelola-role-table />
    </card-component>
  </main-section>
</template>
