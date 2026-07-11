<script setup lang="ts">
defineProps<{
  title: string;
  when: string;
}>();

import { computed, ref, useSlots} from 'vue';

const isOpen = ref(false);

const slots = useSlots();
const hasSlotContent = computed(() => !!slots.default?.());

const toggleOpen = () => {
  if (hasSlotContent.value) {
    isOpen.value = !isOpen.value;
  }
};
</script>

<template>
  <section w-full>
    <div flex w-full justify-between>
      <div @click="toggleOpen" flex flex-1 items-center gap-1>
        <h2 m-2>{{ title }}</h2>
        <small text-sm>{{ when }}</small>
      </div>
      <button
        v-if="hasSlotContent"
        @click="toggleOpen"
        bg-transparent
        border-none
        text-white
        flex
        items-center
        transition="transform 300 ease-in-out"
        :class="{ rotate180: isOpen }"
      >
        <i text-xl i-hugeicons-arrow-down-01></i>
      </button>
    </div>

    <div px-4 class="menu-wrapper" :class="{ 'is-open': isOpen }">
      <div class="menu-content">
        <slot />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.rotate180 {
  transform: rotate(180deg);
}

.menu-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease-in-out;
  overflow: hidden;

  &.is-open {
    grid-template-rows: 1fr;
  }
}

.menu-content {
  min-height: 0;
}
</style>
