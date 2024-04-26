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
  RESOURCE = 'resource',
  HACKATHON = 'hackathon',
  PRESS_KIT = 'press-kit'
}
export const cookieName = 'i18next';
export const locales = [Lang.ZH, Lang.EN];
export const transNs = [
  TransNs.BASIC,
  TransNs.LEARN,
  TransNs.LAUNCH_POOL,
  TransNs.LANDING,
  TransNs.RESOURCE,
  TransNs.REWARD,
  TransNs.HACKATHON,
  TransNs.PRESS_KIT
];
export const defaultLocale = Lang.EN;

export const defaultNs = TransNs.BASIC;
