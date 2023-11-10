<script setup>
import { useRouter, useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'fade'">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.slide-right-enter-from {
  position: absolute;
  opacity: 0;
  transform: translateX(-100%);
}

.slide-right-leave-to {
  position: absolute;
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-enter-from {
  position: absolute;
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-leave-to {
  position: absolute;
  opacity: 0;
  transform: translateX(-100%);
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: 0.5s ease;
}</style>

