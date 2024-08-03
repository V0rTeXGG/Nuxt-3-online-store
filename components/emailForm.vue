<template>
  <form :class="{'email-form--footer': isFooter}" class="email-form ">
    <div class="email-form__input-container">
      <span :class="{active: isFocusInput || email.length}" class="email-form__input-label">your@email.com</span>
      <input
          v-model="email"
          @focus="isFocusInput = true; isEmailError = false"
          @blur="isFocusInput = false"
          type="email"
          class="email-form__input">
      <span v-if="isEmailError" class="email-form__error">Email is error</span>
    </div>
    <button @click.prevent="submitForm" type="submit" class="email-form__button btn--dark">Sign up</button>
  </form>
</template>

<script setup>
const prop = defineProps({
  isFooter: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['emailSent']);

const isFocusInput = ref(false)
const email = ref('')
const isEmailError = ref(false)

const isCheckEmail = computed(() => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.value)
})

function submitForm() {
  if(isCheckEmail.value) {
    emit('emailSent')
  } else {
    isEmailError.value = true
  }
}

</script>

<style lang="scss" scoped>

</style>