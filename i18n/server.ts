import 'server-only';
import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { headers as getHeader } from 'next/headers';
import { locales, defaultLocale } from './config';

const initI18next = async (lng = defaultLocale, ns = 'basic') => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init({
      // debug: true,
      supportedLngs: locales,
      fallbackLng: defaultLocale,
      lng,
      fallbackNS: 'basic',
      defaultNS: 'basic',
      ns
    });
  return i18nInstance;
};

export async function useTranslation(
  lng: string = defaultLocale,
  ns?: string,
  options: { keyPrefix?: string } = {}
) {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options?.keyPrefix
    ),
    i18n: i18nextInstance
  };
}

export function getLang() {
  let header = getHeader();
  const referer = header.get('referer');
  if (!referer) return defaultLocale;
  const refererUrl = new URL(referer);
  const findLocal = locales.find(
    (locale) =>
      refererUrl.pathname.startsWith(`/${locale}/`) ||
      refererUrl.pathname === `/${locale}`
  );

  if (findLocal) return findLocal;
  return defaultLocale;
}
