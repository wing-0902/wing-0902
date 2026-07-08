import { defineConfig } from 'astro/config';

import UnoCSS from 'unocss/astro';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  integrations: [
    UnoCSS({
      injectReset: false // disable auto style reset in order to specify multiple stylesheets
    }),
    vue()
  ],
  output: 'static',
  scopedStyleStrategy: 'class',
  site: 'https://wing.osaka',
  trailingSlash: 'always'
});
