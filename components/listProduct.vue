<template>
  <ul class="product-list">
    <product-card :class="{'product-item--large': isPopular && item.id === 1}" v-for="item in prop.items" :key="item.id" :item-info="item"/>
  </ul>
</template>

<script setup>
  const prop = defineProps({
    items: {
      type: Object,
      required: true,
    },
    isPopular: {
      type: Boolean
    }
  })
</script>

<style lang="scss" scoped>

</style>