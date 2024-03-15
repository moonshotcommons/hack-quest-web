export enum Lang {
  ZH = 'zh',
  EN = 'en'
}

export enum TransNs {
  BASIC = 'basic',
  LAUNCH_POOL = 'launch-pool'
}

export const locales = [Lang.ZH, Lang.EN];
export const defaultLocale = Lang.EN;

export const defaultNs = TransNs.BASIC;
