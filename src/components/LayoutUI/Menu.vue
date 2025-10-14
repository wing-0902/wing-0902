<template>
  <div class='menuContainer'>
    <button
      :class="{ 'is-active': isOpen }"
      @click="toggleMenu"
      aria-label="メニューを開閉"
    >
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>
    <nav></nav>
    <div v-if="isOpen" class="overlay" @click="toggleMenu"></div>
  </div>
</template>

<script lang="ts">
  export default {
    name: "HamburgerMenu",
    data() {
      return {
        isOpen: false,
      };
    },
    methods: {
      toggleMenu() {
        this.isOpen = !this.isOpen;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .menuContainer {
    position: relative;
    z-index: 1000;

    button {
      width: 30px;
      height: 30px;
      background: none;
      border: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      cursor: pointer;
      z-index: 1001;
      position: relative;

      .bar {
        display: block;
        width: 100%;
        height: 2px;
        border-radius: 1px;
        background-color: var(--foreground);
        transition: all 0.4s ease;
      }
      &.is-active {
        .bar {
          &:nth-child(2) {
            opacity: 0;
          }
        }
      }
    }
  }
</style>