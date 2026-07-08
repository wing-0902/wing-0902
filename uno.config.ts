import { defineConfig, presetWind4 } from 'unocss';
import { presetAttributify } from 'unocss';

export default defineConfig({
  presets: [
    presetAttributify(),
    presetWind4(),
  ],
})