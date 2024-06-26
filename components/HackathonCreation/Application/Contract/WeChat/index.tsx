import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { getValidateResult } from '@/components/HackathonCreation/constants';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface WeChatProps {
  form: any;
  config: CustomComponentConfig;
}

const WeChat: FC<WeChatProps> = ({ config: propConfig, form }) => {
  const config = {
    ...propConfig,
    type: 'input'
  };
  return renderFormComponent(config as CustomComponentConfig, form);
};

WeChat.displayName = 'WeChat';

export const WeChatConfig: PresetComponentConfig<WeChatProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: WeChat.displayName,
  component: WeChat,
  optional: false,
  property: {
    label: 'WeChat',
    placeholder: 'Enter a WeChat Account',
    name: 'weChat'
  },
  validate(values: { weChat: string }, form) {
    return [getValidateResult(z.string().min(10).max(100).safeParse(values.weChat), form, 'weChat')];
  }
};

export default WeChatConfig;
