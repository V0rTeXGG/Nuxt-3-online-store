<template>

  <section  class="product">
    <div class="container">
      <div class="product__container">
        <the-loader v-if="isLoader"/>
        <template v-else>
          <div class="product__img-container">
            <img :src="`${productData.image}`" alt="product" class="product__img">
          </div>
          <div class="product__info">
            <div class="product__info-top">
              <div class="product__info-title">
                <p>{{productData.title}}</p>
              </div>
              <div class="product__info-price">
                <p>£{{productData.price}}</p>
              </div>
            </div>
            <div class="product__info-block">
              <p class="product__info-subtitle">Product description</p>
              <div class="product__info-description">
                <p>{{productData.description}}</p>
              </div>
            </div>
            <div class="product__info-block">
              <p class="product__info-subtitle">Dimensions</p>
              <ul class="product__info-dimensions">
                <li class="product__info-dimensions__item">
                  <p class="product__info-dimensions__title">Height</p>
                  <div class="product__info-dimensions__value">{{productData.dimensions?.height}}</div>
                </li>
                <li class="product__info-dimensions__item">
                  <div class="product__info-dimensions__title">Width</div>
                  <div class="product__info-dimensions__value">{{productData.dimensions?.width}}</div>
                </li>
                <li class="product__info-dimensions__item">
                  <div class="product__info-dimensions__title">Depth</div>
                  <div class="product__info-dimensions__value">{{productData.dimensions?.depth}}</div>
                </li>
              </ul>
            </div>
            <div class="product__info-block">
              <p class="product__info-subtitle">Quantity</p>
              <counter v-model="productData.quantity" class="product__info-counter"/>
            </div>
            <div class="product__info-buttons">
              <button
                  @click="addToCart"
                  :class="{inactive: isCart}"
                  type="button" class="product__info-button  btn--dark">Add to cart</button>
              <button @click="addToFavorite" :class="{inactive: isFavorite}" type="button" class="product__info-button product__info-button--large btn--light">Save to favorites</button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
  <section class="offer">
    <div class="container">
      <div class="offer__container">
        <h2>You might also love these</h2>
        <list-product v-if="productStore.recommendationProducts.length" :items="productStore.recommendationProducts" class="offer__list"/>
        <NuxtLink class="btn btn--light">
          View collection
        </NuxtLink>
      </div>
    </div>
  </section>
  <brand-diferent/>
  <content-block :content="content"/>
</template>

<script setup>
import {useProductStore} from '@/stores/products.js'

const productStore = useProductStore()
const {$api} = useNuxtApp()
const {id} = useRoute().params
const productData = ref({})
const isLoader = ref(true)

const content = {
  title: '<span>Join the club and get the benefits</span>',
  description: '<p>Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop up stores and more</p>',
  image: '/story-2.png',
  reverse: true,
  form: true,
}

const isCart = computed(() => {
  return Boolean(productStore.cartProducts.find(item => item.parentId === productData.value.id))
})

const isFavorite = computed(() => {
  return Boolean(productStore.favoriteProduct.find(item => item.parentId === productData.value.id))
})

async function fetchProductData(id) {
  try {
    const {data} = await $api.get('/products/' + id)
    productData.value = {
      ...data,
      quantity: 1,
    }
  } catch (error) {
    console.log(error)
  }
}

async function addToCart() {
  try {
    if(!isCart.value) {
      const product =  {
        parentId: productData.value.id,
        ...productData.value,
      }
      await $api.post('/cart', product)
      productStore.addedProductToCart(product)
    }
  } catch(error) {
    console.log(error)
  }
}

async function addToFavorite() {
  try {
    if(!isFavorite.value) {
      const product =  {
        parentId: productData.value.id,
        ...productData.value,
      }
      await $api.post('/favorite', product)
      isFavorite.value = true
      productStore.favoriteProduct.push(product)
    }
  } catch(error) {
    console.log(error)
  }
}

onMounted(async () => {
  try {
    await fetchProductData(id)
    await productStore.fetchRecommendationProducts()
    await productStore.fetchCartProduct()
    await productStore.fetchFavoriteProduct()
  } catch (error) {
    console.log(error)
  } finally {
    isLoader.value = false
  }
})
</script>

<style lang="scss" scoped>

</style>

