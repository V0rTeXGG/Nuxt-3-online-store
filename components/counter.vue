<template>
  <div class="counter">
    <button @click="decreaseCount()" type="button" class="counter__button" data-counter="minus">-</button>
    <input type="number" class="counter__input" @change="handleInput($event)" v-model.lazy="internalCount">
    <button @click="increaseCount()" type="button" class="counter__button" data-counter="plus">+</button>
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['update:modelValue'])

const internalCount = ref(props.modelValue)

function decreaseCount() {
  if (internalCount.value > 1) {
    internalCount.value--
  }
}

function increaseCount() {
  internalCount.value++
}

function handleInput(event) {
  const newValue = event.target.value
  const regex = /^[1-9]$/
  if (newValue < 1 || regex.test(newValue)) {
    internalCount.value = 1
  } else {
    internalCount.value = Number(newValue)
  }
}

// watch(() => props.modelValue, (newValue) => {
//   internalCount.value = newValue
// })

watch(internalCount, (newValue) => {
  emit('update:modelValue', newValue)
})


</script>
