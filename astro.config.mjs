// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

import svelte from '@astrojs/svelte';
import vue from '@astrojs/vue';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://wing.osaka',
  integrations: [svelte(), vue(), sitemap()],
  image: {
    service: passthroughImageService()
  },
});