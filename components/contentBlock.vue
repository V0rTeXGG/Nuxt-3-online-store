<template>
  <section  class="content">
    <div :class="{'content__wrapper--reverse': content.reverse}" class="content__wrapper">
      <div v-if="!content?.form" class="content__left">
        <div key="form" class="content__left-wrapper">
          <div class="content__description">
            <div v-html="content.title" class="content__description-title">
            </div>
            <div v-html="content.description" class="content__description-text">
            </div>
          </div>
          <NuxtLink to="/" class="content__description-link btn btn--light">Get in touch</NuxtLink>
        </div>
      </div>
      <div v-else class="content__left">
        <transition name="slide-up" mode="out-in">
          <template v-if="!subscribeStore.isSubscribe">
            <div key="form" class="content__left-wrapper">
              <div class="content__description">
                <div v-html="content.title" class="content__description-title">
                </div>
                <div v-html="content.description" class="content__description-text">
                </div>
              </div>
              <email-form @email-sent="subscribeStore.handleSubscribe"/>
            </div>
          </template>
          <template v-else>
            <div key="thanks" class="content__description">
              <div class="content__description-title content__description-title--large">
                <p>Thanks for subscribing</p>
              </div>
            </div>
          </template>
        </transition>
      </div>
      <div class="content__right">
        <img :src="content.image" alt="interior" class="content__right-img">
      </div>
    </div>
  </section>
</template>

<script setup>
import EmailForm from "~/components/emailForm.vue";
import {useSubscribeStore} from '@/stores/subscribe.js'

const prop = defineProps({
  content: {
    type: Object,
    required: true
  }
})

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