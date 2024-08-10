// import 'server-only';
import { KeyPrefix, Namespace, createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { locales, defaultLocale, Lang, TransNs, transNs } from './config';

const initI18next = async (lng = defaultLocale, ns = TransNs.BASIC) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .init({
      // debug: true,
      supportedLngs: locales,
      fallbackLng: defaultLocale,
      lng,
      fallbackNS: TransNs.BASIC,
      defaultNS: TransNs.BASIC,
      ns: transNs
    });
  return i18nInstance;
};

export async function useTranslation(
  lng: Lang = defaultLocale,
  ns = TransNs.BASIC,
  options: { keyPrefix?: KeyPrefix<Namespace> } = {}
) {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options?.keyPrefix),
    i18n: i18nextInstance
  };
}
