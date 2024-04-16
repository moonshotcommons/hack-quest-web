export enum Lang {
  ZH = 'zh',
  EN = 'en'
}

export enum TransNs {
  BASIC = 'basic',
  LAUNCH_POOL = 'launch-pool',
  REWARD = 'reward',
  LANDING = 'landing',
  LEARN = 'learn',
  RESOURCE = 'resource'
}
export const cookieName = 'i18next';
export const locales = [Lang.ZH, Lang.EN];
export const transNs = [
  TransNs.BASIC,
  TransNs.LEARN,
  TransNs.LAUNCH_POOL,
  TransNs.LANDING,
  TransNs.RESOURCE,
  TransNs.REWARD
];
export const defaultLocale = Lang.EN;

export const defaultNs = TransNs.BASIC;
