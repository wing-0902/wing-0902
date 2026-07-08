import { defineConfig } from 'unocss';
import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import presetMini from '@unocss/preset-mini';

export default defineConfig({
  presets: [presetAttributify(), presetIcons(), presetMini()]
});
