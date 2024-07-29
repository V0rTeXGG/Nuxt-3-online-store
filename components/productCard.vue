<template>
  <li class="product-item">
    <NuxtLink :to="`/products/${itemInfo.id}`" class="product-item__image-wrapper">
      <img :src="itemInfo.image" alt="chair" class="product-item__image">
    </NuxtLink>
    <div class="product-item__title">
      <span>{{itemInfo.title}}</span>
    </div>
    <div class="product-item__price">
      <span>£{{itemInfo.price}}</span>
    </div>
  </li>
</template>

<script setup>
  const prop = defineProps({
    itemInfo: {
      type: Object,
      required: true,
    }
  })

</script>

<style lang="scss" scoped>

</style>