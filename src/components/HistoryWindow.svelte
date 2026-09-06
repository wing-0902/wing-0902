<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    title,
    when,
    children
  }: {
    title: string;
    when: string;
    children?: Snippet;
  } = $props();

  let isOpen = $state(false);

  let hasContent = $derived(!!children);

  const toggleOpen = () => {
    if (hasContent) {
      isOpen = !isOpen;
    }
  };
</script>

<section w-full>
  <div flex w-full justify-between>
    <div onclick={toggleOpen} flex flex-1 items-center gap-1 cursor-pointer>
      <h2 m-2>{title}</h2>
      <small text-sm>{when}</small>
    </div>

    {#if hasContent}
      <button
        onclick={toggleOpen}
        bg-transparent
        border-none
        text-white
        flex
        items-center
        transition="transform 300 ease-in-out"
        class:rotate180={isOpen}
        aria-label="詳細を見る"
      >
        <i text-xl i-hugeicons-arrow-down-01></i>
      </button>
    {/if}
  </div>

  <div px-4 class="menu-wrapper" class:is-open={isOpen}>
    <div class="menu-content">
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
</section>

<style lang="scss">
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
