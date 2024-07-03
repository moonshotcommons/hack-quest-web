import { omit } from 'lodash-es';
import { PresetComponentConfig } from '../../type';
import { IGNORE_FIELDS } from '../../constants';
import FacebookConfig from './Facebook';
import FarcasterNameConfig from './Farcaster';
import GithubConfig from './Github';
import LinkedInConfig from './LinkedIn';
import QQConfig from './QQ';
import TwitterConfig from './Twitter';
import WhatsAppConfig from './WhatsApp';

export const OnlineProfilesSectionComponentMap: Record<string, PresetComponentConfig<any>> = {
  [GithubConfig.type]: GithubConfig,
  [WhatsAppConfig.type]: WhatsAppConfig,
  [FacebookConfig.type]: FacebookConfig,
  [TwitterConfig.type]: TwitterConfig,
  [LinkedInConfig.type]: LinkedInConfig,
  [QQConfig.type]: QQConfig,
  [FarcasterNameConfig.type]: FarcasterNameConfig
};

export const OnlineProfilesSectionComponentList = Object.values(OnlineProfilesSectionComponentMap).map((cfg) =>
  omit(cfg, IGNORE_FIELDS)
);
