<template>
  <transition :duration="550" name="nested">
    <div v-if="isVisible" @click.stop="closeModal" class="modal">
      <div @click.stop class="modal__content">
        <button @click="closeModal" class="modal__close">
          <svg-icon name="xmark"></svg-icon>
        </button>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script setup>
const emit = defineEmits(['closeModal'])

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  }
})

function closeModal() {
  emit('closeModal')
}

watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
});
</script>

<style lang="scss" scoped>
.nested-enter-active, .nested-leave-active {
  transition: all 0.3s ease;
}

.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  opacity: 0;
}

.nested-enter-active .modal__container,
.nested-leave-active .modal__container {
  transition: all 0.3s ease;
}

.nested-enter-active .modal__container {
  transition-delay: 0.25s;
}

.nested-enter-from .modal__container,
.nested-leave-to .modal__container {
  transform: translateY(50px);
  opacity: 0.001;
}

</style>