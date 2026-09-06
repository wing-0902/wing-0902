import { defineConfig } from 'astro/config';

import { unified } from '@astrojs/markdown-remark';

import UnoCSS from 'unocss/astro';
import alpinejs from '@astrojs/alpinejs';
import svelte from '@astrojs/svelte';
import solidJs from '@astrojs/solid-js';

import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ['ja-jp', 'en-gb'],
    defaultLocale: 'ja-jp'
  },
  integrations: [UnoCSS(), alpinejs(), svelte(), solidJs({ devtools: true })],
  markdown: {
    processor: unified({
      rehypePlugins: [
        [rehypeExternalLinks, { target: '_blank', rel: ['nofollow', 'noopener', 'noreferrer'] }]
      ]
    })
  },
  output: 'static',
  scopedStyleStrategy: 'class',
  site: 'https://wing.osaka',
  trailingSlash: 'always'
});
