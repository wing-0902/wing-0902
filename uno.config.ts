import { defineConfig } from 'unocss';
import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import presetMini from '@unocss/preset-mini';

import transformerCompileClass from '@unocss/transformer-compile-class';
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx';

export default defineConfig({
  presets: [presetAttributify(), presetIcons(), presetMini()],
  transformers: [transformerAttributifyJsx(), transformerCompileClass()]
});
