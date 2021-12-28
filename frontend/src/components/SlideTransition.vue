<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const animate = ref(false)

onMounted(() => (animate.value = true))
</script>

<template>
  <transition :name="route.meta.transition">
    <slot v-if="animate"></slot>
  </transition>
</template>

<style scoped>
/* TODO: moved to css file */
.slide-right-enter-active {
  transition: all 0.5s ease;
  transform: translateX(0rem);
}
.slide-right-leave-active {
  position: absolute;
}

.slide-right-enter-from {
  transform: translateX(-1rem);
}
.slide-right-leave-to {
  opacity: 0;
}

.slide-left-enter-active {
  transition: all 0.5s ease;
  transform: translateX(0rem);
}
.slide-left-leave-active {
  position: absolute;
}

.slide-left-enter-from {
  transform: translateX(1rem);
}
.slide-left-leave-to {
  opacity: 0;
}
</style>
