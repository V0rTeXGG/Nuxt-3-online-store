<template>
  <section class="subscribe">
    <div class="container">
      <div class="subscribe__block">
        <div class="subscribe__wrapper">
          <transition name="slide-up" mode="out-in">
            <template v-if="!subscribeStore.isSubscribe">
              <div key="form">
                <div class="subscribe__title">
                  <p>Join the club and get the benefits</p>
                </div>
                <div class="subscribe__description">
                  <p>Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop up stores and more</p>
                </div>
                <email-form @email-sent="subscribeStore.handleSubscribe"/>
              </div>
            </template>
            <template v-else>
              <div key="thanks">
                <div class="subscribe__title">
                  <p>Thanks for subscribing</p>
                </div>
              </div>
            </template>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import EmailForm from "~/components/emailForm.vue";
import {useSubscribeStore} from '@/stores/subscribe.js'

const subscribeStore = useSubscribeStore()

</script>

<style lang="scss" scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>