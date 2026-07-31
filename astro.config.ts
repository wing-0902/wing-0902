import { defineConfig } from 'astro/config';

import UnoCSS from 'unocss/astro';
import vue from '@astrojs/vue';

import alpinejs from '@astrojs/alpinejs';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
  integrations: [UnoCSS(), vue(), alpinejs()],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noopener', 'noreferrer']
        }
      ]
    ]
  },
  output: 'static',
  scopedStyleStrategy: 'class',
  site: 'https://wing.osaka',
  trailingSlash: 'always'
});
