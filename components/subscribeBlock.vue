<template>
  <section class="subscribe">
    <div class="container">
      <div class="subscribe__block">
        <div class="subscribe__wrapper">
          <div class="subscribe__title">
            <p>Join the club and get the benefits</p>
          </div>
          <div class="subscribe__description">
            <p>Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop up stores and more</p>
          </div>
          <email-form/>
        </div>
      </div>
    </div>
  </section>

</template>

<script setup>

import EmailForm from "~/components/emailForm.vue";
</script>

<style lang="scss" scoped>

</style>