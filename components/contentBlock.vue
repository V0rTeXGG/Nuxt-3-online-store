<template>
  <section  class="content">
    <div :class="{'content__wrapper--reverse': content.reverse}" class="content__wrapper">
      <div class="content__left">
        <template v-if="!subscribeStore.isSubscribe">
          <div class="content__description">
            <div v-html="content.title" class="content__description-title">
            </div>
            <div v-html="content.description" class="content__description-text">
            </div>
          </div>
          <NuxtLink v-if="!content?.form" to="/" class="content__description-link btn btn--light">Get in touch</NuxtLink>
          <email-form v-else @email-sent="subscribeStore.handleSubscribe"/>
        </template>
        <template v-else>
          <div class="content__description">
            <div class="content__description-title content__description-title--large">
              <p>Thanks for subscribing</p>
            </div>
          </div>
        </template>
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

</style>