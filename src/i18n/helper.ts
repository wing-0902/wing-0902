import jaJP from './ja-JP.json';
import enGB from './en-GB.json';
import type { AstroGlobal } from 'astro';

type Translations = typeof jaJP;
type Lang = 'ja-jp' | 'en-gb';

const translations: Record<Lang, Translations> = {
  'ja-jp': jaJP,
  'en-gb': enGB
};

export function useTranslations(Astro: Readonly<Pick<AstroGlobal, 'currentLocale'>>) {
  const lang = (Astro.currentLocale as Lang) ?? 'ja-jp';
  const dict = translations[lang] ?? translations['ja-jp'];

  return function t(key: string): string {
    return key.split('.').reduce((obj: any, i: string) => (obj ? obj[i] : null), dict) ?? key;
  };
}
