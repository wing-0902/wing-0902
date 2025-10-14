<template>
  <div class='menuContainer'>
    <button
      :class="{ 'is-active': isOpen, 'is-down': isDown, 'is-45deg': is45deg }"
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
        isDown: false,
        is45deg: false,
      };
    },
    methods: {
      toggleMenu() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
          this.isDown = !this.isDown;
          setTimeout(() => {
            this.is45deg = !this.is45deg;
          }, 300);
        } else {
          this.is45deg = !this.is45deg;
          setTimeout(() => {
            this.isDown = !this.isDown;
          },300);
        };
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
      &.is-down {
        .bar {
          --goDown: 10px;
          --goUp: -10px;
          &:nth-child(1) {
            transform: translateY(var(--goDown));
          }
          &:nth-child(3) {
            transform: translateY(var(--goUp));
          }
        }
      }
      &.is-45deg {
        .bar {
          &:nth-child(1) {
            transform: translateY(var(--goDown)) rotate(45deg);
          }
          &:nth-child(3) {
            transform: translateY(var(--goUp)) rotate(-45deg);
          }
        }
      }
    }
  }
</style>