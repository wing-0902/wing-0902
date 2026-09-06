import jaJP from './ja-JP.json';
import enGB from './en-GB.json';

const translations = {
  'ja-JP': jaJP,
  'en-GB': enGB,
};

export function useTranslations(Astro) {
  const lang = Astro.currentLocale ?? 'ja-JP';
  const dict = translations[lang] ?? translations['ja-JP'];

  return function t(key) {
    return key.split('.').reduce((obj, i) => (obj ? obj[i] : null), dict) ?? key;
  };
}