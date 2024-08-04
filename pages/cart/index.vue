<template>
  <section class="cart">
    <div class="container">
      <div class="cart__container">
        <the-loader v-if="isLoader"/>

        <template v-else>
          <template v-if="!productStore.cartProducts.length">
            <h2  class="cart__empty">Your Shopping cart is empty</h2>
            <NuxtLink to="/products" class="btn btn--dark">Go to products</NuxtLink>
          </template>
          <template v-else>
            <h2>Your shopping cart</h2>
            <div class="cart__main">
              <div class="cart__main-top">
                <p class="cart__main-title">Product</p>
                <p class="cart__main-title">Quantity</p>
                <p class="cart__main-title">Total</p>
              </div>
              <div class="cart__line"></div>
              <div
                  v-for="item in productStore.cartProducts"
                  :key="item.id"
                  class="cart__item">
                <div class="cart__col">
                  <NuxtLink :to="`/products/${item.parentId}`" class="cart__product">
                    <div class="cart__image-wrapper">
                      <img :src="`${item.image}`" alt="" class="cart__image">
                    </div>
                    <div class="cart__info">
                      <p class="cart__product-title">{{item.title}}</p>
                      <p class="cart__product-description">{{item.description}}</p>
                      <p class="cart__product-price">£{{item.price}}</p>
                    </div>
                  </NuxtLink>
                </div>
                <div class="cart__col">
                  <counter
                      @click="countProductPrice(item)"
                      @change="countProductPrice(item)"
                      v-model="item.quantity"/>
                </div>
                <div class="cart__col">
                  <p class="cart__total-price">£{{item.totalPrice}}</p>
                </div>
              </div>
            </div>
            <div class="cart__total">
              <div class="cart__total-top">
                <span class="cart__label">Subtotal</span>
                <span class="cart__price">£{{productStore.totalPriceCart}}</span>
              </div>
              <p class="cart__postword">Taxes and shipping are calculated at checkout</p>
              <button @click="openModalOrder" type="button" class="cart__button btn--dark">Go to checkout</button>
            </div>
          </template>
        </template>
      </div>
    </div>
  </section>
  <the-modal :is-visible="isModalVisible" @close-modal="isModalVisible = false">
    <transition name="fade" mode="out-in">
        <div v-if="!isCreateOrder" class="modal__container">
          <p class="modal__title">Order products:</p>
          <ul class="modal__list">
            <li
                v-for="item in productStore.cartProducts"
                :key="item.id"
                class="modal__products">
              <div class="modal__products-main">
                <img :src="`${item.image}`" alt="products image" class="modal__products-image">
                <div class="modal__products-info">
                  <p class="modal__products-title">{{item.title}}</p>
                  <p class="modal__products-description">{{item.description}}</p>
                  <p class="modal__products-label">Quantity: {{item.quantity}}</p>
                  <p class="modal__products-label">Price: £{{item.totalPrice}}</p>
                </div>
              </div>
            </li>
          </ul>
          <div class="modal__bottom">
            <div class="modal__bottom-block">
              <span class="modal__bottom-label">Total price: </span>
              <span class="modal__bottom-price">£{{productStore.totalPriceCart}}</span>
            </div>
            <button @click="createOrder" class="modal__bottom-button btn--dark">Create order</button>
          </div>
        </div>
      <div v-else class="modal__container">
        <p class="modal__title--thanks">Thanks for order!</p>
      </div>
    </transition>

  </the-modal>
</template>

<script setup>
import {useProductStore} from '@/stores/products.js'
import TheModal from "~/layouts/TheModal.vue";

useHead({
  title: 'Avion cart',
  description: 'Page cart'
})

const {$api} = useNuxtApp()
const productStore = useProductStore()
const isLoader = ref(true)
const isCreateOrder = ref(false)
const isModalVisible = ref(false)

function countProductPrice(item) {
  item.totalPrice = item.price * item.quantity
}

function openModalOrder() {
  isModalVisible.value = true
}

async function createOrder() {
  try {
    const order = {
      products: productStore.cartProducts,
    }
    await $api.post('/orders', order)
    productStore.clearCart()
    isCreateOrder.value = true
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  try {
    await productStore.fetchCartProduct()
  } catch (error) {
    console.log(error)
  } finally {
    isLoader.value = false
  }
})
</script>

<style lang="scss" scoped>

.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

</style>