import { joinURL, parseURL, withoutHost, withoutTrailingSlash, withTrailingSlash } from 'ufo';

export function getLang(url: string) {
  const { pathname } = parseURL(url);
  const lastPath = withoutTrailingSlash(pathname).split('/').pop();

  let lang = 'ja';

  if (lastPath === 'en') {
    lang = 'en';
  }

  return lang;
}

export function getEnUrl(jaUrl: string) {
  return withTrailingSlash(withoutHost(joinURL(jaUrl + 'en')));
}

export function getJaUrl(enUrl: string) {
  const { pathname, search, hash } = parseURL(enUrl);

  const cleanPath = withoutTrailingSlash(pathname);

  if (cleanPath.endsWith('/en')) {
    const jaPath = cleanPath.slice(0, -3);
    return withTrailingSlash(withoutHost(joinURL(jaPath, search + hash)));
  }

  return withTrailingSlash(withoutHost(enUrl));
}
