import { domains } from './enum';

export const HACKQUEST_DISCORD = 'https://discord.gg/KkAJHPqywn';
export const HACKQUEST_TWITTER = 'https://x.com/hackquest_?s=21&t=kYetGSBybf-ssFBo7GodGA';
export const HACKQUEST_TELEGRAM = 'https://t.me/hackquester';
export const HACKQUEST_LINKEDIN = 'https://www.linkedin.com/company/moonshotcommons/';

export const getDomain = (domain: string) => {
  switch (domain) {
    case 'dev':
      return domains.dev;
    case 'staging':
      return domains.staging;
    case 'production':
      return domains.prod;
    default:
      return domains.local;
  }
};
