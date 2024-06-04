import 'i18next';

import basic from '@/i18n/locales/en/basic.json';
import landing from '@/i18n/locales/en/landing.json';
import launchPool from '@/i18n/locales/en/launch-pool.json';

interface I18nNamespaces {
  basic: typeof basic;
  landing: typeof landing;
  launchPool: typeof launchPool;
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'basic';
    resources: I18nNamespaces;
  }
}
