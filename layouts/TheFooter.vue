<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__top">
        <nav class="footer__navigation">
          <ul class="footer__list">
            <li class="footer__list-item">
              <span class="footer__list-title">Menu</span>
            </li>
            <li class="footer__list-item">
              <NuxtLink to="/" class="footer__list-link">New arrivals</NuxtLink>
            </li>
            <li class="footer__list-item">
              <NuxtLink to="/" class="footer__list-link">Best sellers</NuxtLink>
            </li>
            <li class="footer__list-item">
              <NuxtLink to="/" class="footer__list-link">Recently viewed</NuxtLink>
            </li>
            <li class="footer__list-item">
              <NuxtLink to="/" class="footer__list-link">Popular this week</NuxtLink>
            </li>
            <li class="footer__list-item">
              <NuxtLink to="/" class="footer__list-link">All products</NuxtLink>
            </li>
          </ul>
          <ul class="footer__list">
            <li class="footer__list-item">
              <span class="footer__list-title">Categories</span>
            </li>
            <li class="footer__list-item">
              <NuxtLink to="/" class="footer__list-link">Crockery</NuxtLink>
            </li>
            <li class="footer__list-item">
              <NuxtLink to="/" class="footer__list-link">Furniture</NuxtLink>
            </li>
            <li class="footer__list-item">
              <NuxtLink to="/" class="footer__list-link">Homeware</NuxtLink>
            </li>
            <li class="footer__list-item">
              <NuxtLink to="/" class="footer__list-link">Plant pots</NuxtLink>
            </li>
            <li class="footer__list-item">
              <NuxtLink to="/" class="footer__list-link">Chairs</NuxtLink>
            </li>
            <li class="footer__list-item">
              <NuxtLink to="/" class="footer__list-link">Crockery</NuxtLink>
            </li>
          </ul>
          <ul class="footer__list">
            <li class="footer__list-item">
              <span class="footer__list-title">Our company</span>
            </li>
            <li class="footer__list-item">
              <NuxtLink to="/" class="footer__list-link">About us</NuxtLink>
            </li>
            <li class="footer__list-item">
              <NuxtLink to="/" class="footer__list-link">Vacancies</NuxtLink>
            </li>
            <li class="footer__list-item">
              <NuxtLink to="/" class="footer__list-link">Contact us</NuxtLink>
            </li>
            <li class="footer__list-item">
              <NuxtLink to="/" class="footer__list-link">Privacy</NuxtLink>
            </li>
            <li class="footer__list-item">
              <NuxtLink to="/" class="footer__list-link">Returns policy</NuxtLink>
            </li>
          </ul>
        </nav>
        <div class="footer__join">
          <transition name="slide-up" mode="out-in">
            <template v-if="!subscribeStore.isSubscribe">
              <div key="form">
                <p class="footer__join-title">Join our mailing list</p>
                <email-form @email-sent="subscribeStore.handleSubscribe" :is-footer="true"/>
              </div>
            </template>
            <template v-else>
              <p class="footer__join-title footer__join-title--large">Thanks for subscribing</p>
            </template>
          </transition>
        </div>
      </div>
      <div class="footer__bottom">
        <div class="footer__copyright">
          <p>Copyright 2024 Avion LTD</p>
        </div>
        <div class="footer__social">
          <NuxtLink class="footer__social-item">
            <svg-icon name="cart" class="footer__social-icon"></svg-icon>
          </NuxtLink>
          <NuxtLink class="footer__social-item">
            <svg-icon name="facebook" class="footer__social-icon"></svg-icon>
          </NuxtLink>
          <NuxtLink class="footer__social-item">
            <svg-icon name="instagram" class="footer__social-icon"></svg-icon>
          </NuxtLink>
          <NuxtLink class="footer__social-item">
            <svg-icon name="skype" class="footer__social-icon"></svg-icon>
          </NuxtLink>
          <NuxtLink class="footer__social-item">
            <svg-icon name="twitter" class="footer__social-icon"></svg-icon>
          </NuxtLink>
          <NuxtLink class="footer__social-item">
            <svg-icon name="pinterest" class="footer__social-icon"/>
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
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
  transform: translateX(-30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>