import { defineConfig } from 'astro/config';

import { unified } from '@astrojs/markdown-remark';

import UnoCSS from 'unocss/astro';
import alpinejs from '@astrojs/alpinejs';
import svelte from '@astrojs/svelte';

import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
  integrations: [UnoCSS(), alpinejs(), svelte()],
  markdown: {
    processor: unified({
      rehypePlugins: [
        [rehypeExternalLinks, { target: '_blank', rel: ['nofollow', 'noopener', 'noreferrer'] }]
      ]
    }),
  },
  output: 'static',
  scopedStyleStrategy: 'class',
  site: 'https://wing.osaka',
  trailingSlash: 'always'
});
