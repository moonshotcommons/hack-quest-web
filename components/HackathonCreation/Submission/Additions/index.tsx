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

export const AdditionsSectionComponentMap: Record<string, PresetComponentConfig<any>> = {
  [FacebookConfig.type]: FacebookConfig,
  [FarcasterNameConfig.type]: FarcasterNameConfig,
  [GithubConfig.type]: GithubConfig,
  [LinkedInConfig.type]: LinkedInConfig,
  [QQConfig.type]: QQConfig,
  [TwitterConfig.type]: TwitterConfig,
  [WhatsAppConfig.type]: WhatsAppConfig
};

export const AdditionsSectionComponentList: Omit<PresetComponentConfig, IgnoreFields>[] = Object.values(
  AdditionsSectionComponentMap
).map((cfg) => omit(cfg, IGNORE_FIELDS));
