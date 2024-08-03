<template>
  <header class="header">
    <div class="header__container">
      <div class="header__top">
        <div class="header__top-left">
          <div
              :class="{'header__search--active': isSearchActive}" class="header__search">
            <button
                @click="openSearch(); searchProduct()"
                :class="{'header__search-button--active': isSearchActive, 'header__search-button--disabled': isSearchActive && !productStore.searchValue}"
                :disabled="isSearchActive && !productStore.searchValue"
                ref="searchButton"
                class="header__button header__search-button" >
              <svg-icon name="search" class="header__icon"/>
            </button>
            <input
                v-model="productStore.searchValue"
                @focusout="closeSearch"
                @keydown.enter="searchProduct()"
                :class="{'header__search-input--active': isSearchActive}"
                ref="search"
                type="search"
                class="header__search-input">
          </div>
          <NuxtLink to="/" class="header__top-name">
            Avion
          </NuxtLink>
        </div>
        <div class="header__top-right">
          <NuxtLink to="/cart" class="header__button">
            <svg-icon name="cart" class="header__icon"/>
          </NuxtLink>
          <button class="header__button">
            <svg-icon name="avatar" class="header__icon"/>
          </button>
          <button
              class="header__burger"
              :class="{active: isBurgerActive}"
              @click="handlerMenu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <div class="header__bottom" :class="{active: isMenuActive}">
        <nav class="header__nav">
          <ul class="header__list">
            <li class="header__list-item">
              <NuxtLink to="/" class="header__list-link">Plant pots</NuxtLink>
            </li>
            <li class="header__list-item">
              <NuxtLink to="/" class="header__list-link">Ceramics</NuxtLink>
            </li>
            <li class="header__list-item">
              <NuxtLink to="/" class="header__list-link">Tables</NuxtLink>
            </li>
            <li class="header__list-item">
              <NuxtLink to="/" class="header__list-link">Chairs</NuxtLink>
            </li>
            <li class="header__list-item">
              <NuxtLink to="/" class="header__list-link">Crockery</NuxtLink>
            </li>
            <li class="header__list-item">
              <NuxtLink to="/" class="header__list-link">Tableware</NuxtLink>
            </li>
            <li class="header__list-item">
              <NuxtLink to="/" class="header__list-link">Cutlery</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>

  </header>
</template>

<script setup>
import {useProductStore} from '@/stores/products.js'

const productStore = useProductStore()
const router = useRouter()
const route = useRoute()

const isBurgerActive = ref(false)
const isMenuActive = ref(false)

const search = ref(null)
const searchButton = ref(null)
const isSearchActive = ref(false)

function handlerMenu() {
  isBurgerActive.value = !isBurgerActive.value
  isMenuActive.value = !isMenuActive.value
}

function openSearch() {
  isSearchActive.value = true
  search.value.focus()
}

function closeSearch(event) {
  if (event.relatedTarget === searchButton.value || event.relatedTarget === search.value) {
    return;
  }
  isSearchActive.value = false;
}
function searchProduct() {
  if (productStore.searchValue.length && isSearchActive.value) {
    router.push(`/products/?${productStore.searchValueOptions}`)
  }
}

watch(isMenuActive, (newValue) => {
  if (newValue) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
});

watch(() => route.path, (newTitle) => {
  if (newTitle !== "/products/") {
    productStore.searchValue = ''
  }
})
</script>

<style lang="scss" scoped>

</style>