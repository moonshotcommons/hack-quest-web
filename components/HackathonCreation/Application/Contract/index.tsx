import { omit } from 'lodash-es';
import { PresetComponentConfig, IgnoreFields } from '../../type';
import { IGNORE_FIELDS } from '../../constants';
import EmailConfig from './Email';
import PhoneNumberConfig from './PhoneNumber';
import WeChatConfig from './WeChat';
import TelegramConfig from './Telegram';
import DiscordConfig from './Discord';

export const ContractSectionComponentMap: Record<string, PresetComponentConfig<any>> = {
  [EmailConfig.type]: EmailConfig,
  [PhoneNumberConfig.type]: PhoneNumberConfig,
  [WeChatConfig.type]: WeChatConfig,
  [TelegramConfig.type]: TelegramConfig,
  [DiscordConfig.type]: DiscordConfig
};

export const ContractSectionComponentList: Omit<PresetComponentConfig, IgnoreFields>[] = Object.values(
  ContractSectionComponentMap
).map((cfg) => omit(cfg, IGNORE_FIELDS));
