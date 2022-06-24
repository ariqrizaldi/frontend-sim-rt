<script setup>
import FullScreenSection from '@/components/FullScreenSection.vue'
import Divider from '@/components/Divider.vue'
import JbButton from '@/components/JbButton.vue'
import JbButtons from '@/components/JbButtons.vue'
</script>

<template>
  <full-screen-section
    bg="white"
  >
    <div class="w-screen h-screen flex flex-col justify-center items-center">
      <img
        class="lg:w-2/5 md:w-3/5 w-4/5"
        src="../../public/404.svg"
        alt="404 not found"
      >
      <divider />
      <h1 class="font-bold lg:text-3xl md:text-2xl text-xl">
        Halaman tidak tersedia
      </h1>
      <divider />
      <jb-buttons class="flex space-x-2">
        <jb-button
          label="Kembali"
          color="info"
          @click="$router.go(-1)"
        />
        <jb-button
          label="Home"
          outline
          color="info"
          @click="$router.push('/home')"
        />
      </jb-buttons>
    </div>
  </full-screen-section>
</template>
