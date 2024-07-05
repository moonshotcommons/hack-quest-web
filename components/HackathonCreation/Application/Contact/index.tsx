import { omit } from 'lodash-es';
import { PresetComponentConfig } from '../../type';
import { IGNORE_FIELDS } from '../../constants';
import EmailConfig from './Email';
import PhoneNumberConfig from './PhoneNumber';
import WeChatConfig from './WeChat';
import TelegramConfig from './Telegram';
import DiscordConfig from './Discord';

export const ContactSectionComponentMap: Record<string, PresetComponentConfig<any>> = {
  [EmailConfig.type]: EmailConfig,
  [PhoneNumberConfig.type]: PhoneNumberConfig,
  [WeChatConfig.type]: WeChatConfig,
  [TelegramConfig.type]: TelegramConfig,
  [DiscordConfig.type]: DiscordConfig
};

export const ContactSectionComponentList = Object.values(ContactSectionComponentMap).map((cfg) =>
  omit(cfg, IGNORE_FIELDS)
);
