import { createSignal } from 'solid-js';
import { getRelativeLocaleUrl } from 'astro:i18n';
import displayName from '~/i18n/displayName.json';

import s from './i18n-change.module.scss';

interface Props {
  currentLang: string;
  currentPath: string;
  locales: string[];
}

export function I18nSwitch(props: Props) {
  const [lang, setLang] = createSignal(props.currentLang);
  let selectRef: HTMLSelectElement | undefined;

  const currentPath = props.currentPath;

  const segments = currentPath.split('/').filter(Boolean);

  if (segments.length > 0 && props.currentLang === segments[0]) {
    segments.shift();
  }

  const cleanPath = '/' + segments.join('/');

  const handleChange = () => {
    if (!selectRef) return;
    const selectedLang = selectRef.value;
    setLang(selectedLang);
    window.location.href = getRelativeLocaleUrl(selectedLang, cleanPath);
  };

  return (
    <div class={s.menu}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
        <path d="m603-202-34 97q-4 11-14 18t-22 7q-20 0-32.5-16.5T496-133l152-402q5-11 15-18t22-7h30q12 0 22 7t15 18l152 403q8 19-4 35.5T868-80q-13 0-22.5-7T831-106l-34-96H603ZM362-401 188-228q-11 11-27.5 11.5T132-228q-11-11-11-28t11-28l174-174q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H80q-17 0-28.5-11.5T40-760q0-17 11.5-28.5T80-800h240v-40q0-17 11.5-28.5T360-880q17 0 28.5 11.5T400-840v40h240q17 0 28.5 11.5T680-760q0 17-11.5 28.5T640-720h-76q-21 72-63 148t-83 116l96 98-30 82-122-125Zm266 129h144l-72-204-72 204Z" />
      </svg>
      <select
        ref={selectRef}
        value={lang()}
        onChange={handleChange}
        bg-transparent
        rounded
        px-2
        py-1
        cursor-pointer
      >
        {props.locales.map((l) => (
          <option value={l} selected={l === props.currentLang}>
            {
              // @ts-ignore
              displayName[l]
            }
          </option>
        ))}
      </select>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
        <path d="M465-363.5q-7-2.5-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5q-8 0-15-2.5Z" />
      </svg>
    </div>
  );
}
