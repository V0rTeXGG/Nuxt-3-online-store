<template>
  <section class="about">
    <div class="container">
      <div class="about__container">
        <div class="about__left">
          <div class="about__left-title">
            <p>The furniture brand for the future, with timeless designs</p>
          </div>
          <NuxtLink to="/products" class="about__left-link">
            View collection
          </NuxtLink>
          <div class="about__left-description">
            <p>A new era in eco friendly furniture with Avelon, the French luxury retail brand with nice fonts, tasteful colors and a beautiful way to display things digitally using modern web technologies.</p>
          </div>
        </div>
        <div class="about__right">
          <img src="/chair.png" alt="chair" class="about__right-image">
        </div>
      </div>
    </div>
  </section>
  <brand-diferent/>
  <section class="new">
    <div class="container">
      <h2>New ceramics</h2>
      <list-product :items="newProduct" class="new__list"/>
      <NuxtLink to="/products" class="btn btn--light">View collection</NuxtLink>
    </div>
  </section>
  <section class="popular">
    <div class="container">
      <h2>Our popular products</h2>
      <list-product :items="popularProduct" :is-popular="true" class="new__list"/>
      <NuxtLink to="/products" class="btn btn--light">View collection</NuxtLink>
    </div>
  </section>
  <subscribe-block/>
  <content-block :content="content"/>
</template>

<script setup>
const {$api} = useNuxtApp()
const popularProduct = ref([])
const newProduct = ref([])

const content = {
  title: '<span>From a studio in London to a global brand with over 400 outlets</span>',
  description: '<p>When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market.</p>   <p>Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community.</p>',
  image: '/story.png',
}
async function fetchPopularProduct() {
  try {
    const {data} = await $api.get('/popular')
    popularProduct.value = data
  } catch(error) {
    console.log(error)
  }
}

async function fetchNewProduct() {
  try {
    const {data} = await $api.get('/new')
    newProduct.value = data
  } catch(error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchPopularProduct()
  fetchNewProduct()
})
</script>

<style lang="scss" scoped>

</style>