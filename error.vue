<template>
  <div class="">
    <p class="">{{error.statusCode}}</p>
    <p class="">Ooops.</p>
    <p class="">{{error.message}}</p>
    <button class="" @click="handleError">Go Home...</button>
  </div>
</template>

<script setup>
const prop = defineProps({
  error: {
    type: Object
  }
})

const handleError = () => clearError({ redirect: '/' })

</script>