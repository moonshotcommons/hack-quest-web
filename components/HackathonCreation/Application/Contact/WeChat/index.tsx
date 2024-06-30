import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
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
  displayRender(info) {
    return (
      <div className="flex flex-1 items-center justify-between">
        <span className="body-m flex items-center  text-neutral-off-black">WeChat</span>
        <span className="body-m text-neutral-off-black">{info.weChat ?? ''}</span>
      </div>
    );
  },
  getValidator(config) {
    const validator = z.string().min(config.optional ? 0 : 1);
    return {
      weChat: config.optional ? validator.optional() : validator
    };
  }
};

export default WeChatConfig;
