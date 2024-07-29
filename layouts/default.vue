<template>
  <TheHeader/>
  <main>
    <slot></slot>
  </main>
  <TheFooter/>
</template>

<script setup>

import TheHeader from "~/layouts/TheHeader.vue";
import TheFooter from "~/layouts/TheFooter.vue";
</script>

<style lang="scss" scoped>

</style>