export enum Lang {
  ZH = 'zh',
  EN = 'en'
}

export enum TransNs {
  BASIC = 'basic',
  LANDING = 'landing',
  LAUNCH_POOL = 'launch-pool'
}
export const cookieName = 'i18next';
export const locales = [Lang.ZH, Lang.EN];
export const transNs = [TransNs.BASIC, TransNs.LAUNCH_POOL, TransNs.LANDING];
export const defaultLocale = Lang.EN;

export const defaultNs = TransNs.BASIC;
