export enum Lang {
  EN = 'en',
  ZH = 'zh'
}

export enum TransNs {
  BASIC = 'basic',
  LAUNCH_POOL = 'launch-pool',
  REWARD = 'reward',
  LANDING = 'landing',
  LEARN = 'learn',
  RESOURCE = 'resource',
  HACKATHON = 'hackathon',
  PRESS_KIT = 'press-kit',
  ECOSYSTEM = 'ecosystem',
  IDEA_BANK = 'idea-bank',
  AUTH = 'auth'
}
export const cookieName = 'i18next';
export const locales = [Lang.EN, Lang.ZH];
export const transNs = [
  TransNs.BASIC,
  TransNs.LEARN,
  TransNs.LAUNCH_POOL,
  TransNs.LANDING,
  TransNs.RESOURCE,
  TransNs.REWARD,
  TransNs.HACKATHON,
  TransNs.PRESS_KIT,
  TransNs.ECOSYSTEM,
  TransNs.IDEA_BANK,
  TransNs.AUTH
];
export const defaultLocale = Lang.EN;

export const defaultNs = TransNs.BASIC;
