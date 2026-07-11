<script setup lang="ts">
defineProps<{
  title: string;
  when: string;
  description?: string;
}>();

import { ref } from 'vue';

const isOpen = ref(false);
</script>

<template>
  <section w-full>
    <div flex w-full justify-between>
      <div flex flex-1 items-center gap-1>
        <h3 m-2>{{ title }}</h3>
        <small>{{ when }}</small>
      </div>
      <button
        @click="isOpen = !isOpen"
        bg-transparent
        border-none
        text-white
        flex
        items-center
        style="transition: transform 0.3s ease-in-out;"
        :class="{ rotate180: isOpen }"
      >
        <i text-xl i-hugeicons-arrow-down-01></i>
      </button>
    </div>
    
    <Transition name="expand">
      <div v-if="isOpen" class="menu-content">
        <p>{{ description }}</p>
      </div>
    </Transition>
  </section>
</template>

<style lang='scss' scoped>
.rotate180 {
  transform: rotate(180deg);
}

/* アニメーション用のCSS */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>