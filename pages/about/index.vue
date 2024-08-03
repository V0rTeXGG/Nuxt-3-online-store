<template>
  <div>
    <section class="top">
      <div class="container">
        <div class="top__container">
          <h1 class="top__title">A brand built on the love of craftmanship,
            quality and outstanding customer service</h1>
          <NuxtLink class="top__link btn--light">View our products</NuxtLink>
        </div>
      </div>
    </section>
    <section class="brand">
      <div class="container">
        <div class="brand__container">
          <div class="brand__left">
            <div class="brand__left-title">
              <p>It started with a small idea</p>
            </div>
            <div class="brand__left-description">
              <p>A global brand with local beginnings, our story begain in a small studio in South London in early 2014</p>
            </div>
            <NuxtLink to="/" class="brand__left-link">
              View collection
            </NuxtLink>
          </div>
          <div class="brand__right">
            <img src="/story-3.png" alt="" class="brand__right-img">
          </div>
        </div>
      </div>
    </section>
    <content-block :content="content"/>
    <brand-diferent/>
    <subscribe-block/>
  </div>
</template>

<script setup>
useHead({
  title: 'Avion about page',
  description: 'Page about'
})

const content = {
  title: '<span>Join the club and get the benefits</span>',
  description: '<p>Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop up stores and more</p>',
  image: '/story-2.png',
  reverse: true,
  form: true,
}

</script>

<style lang="scss" scoped>

</style>