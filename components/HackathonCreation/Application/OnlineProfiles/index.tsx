import { omit } from 'lodash-es';
import { PresetComponentConfig, IgnoreFields } from '../../type';
import { IGNORE_FIELDS } from '../../constants';
import FacebookConfig from './Facebook';
import FarcasterNameConfig from './Farcaster';
import GithubConfig from './Github';
import LinkedInConfig from './LinkedIn';
import QQConfig from './QQ';
import TwitterConfig from './Twitter';
import WhatsAppConfig from './WhatsApp';

export const OnlineProfilesSectionComponentMap: Record<string, PresetComponentConfig<any>> = {
  [FacebookConfig.type]: FacebookConfig,
  [FarcasterNameConfig.type]: FarcasterNameConfig,
  [GithubConfig.type]: GithubConfig,
  [LinkedInConfig.type]: LinkedInConfig,
  [QQConfig.type]: QQConfig,
  [TwitterConfig.type]: TwitterConfig,
  [WhatsAppConfig.type]: WhatsAppConfig
};

export const OnlineProfilesSectionComponentList: Omit<PresetComponentConfig, IgnoreFields>[] = Object.values(
  OnlineProfilesSectionComponentMap
).map((cfg) => omit(cfg, IGNORE_FIELDS));
