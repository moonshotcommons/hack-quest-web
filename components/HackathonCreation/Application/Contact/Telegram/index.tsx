import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface TelegramProps {
  form: any;
  config: CustomComponentConfig;
}

const Telegram: FC<TelegramProps> = ({ config: propConfig, form }) => {
  const config = {
    ...propConfig,
    type: 'input'
  };
  return renderFormComponent(config as CustomComponentConfig, form);
};

Telegram.displayName = 'Telegram';

export const TelegramConfig: PresetComponentConfig<TelegramProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: Telegram.displayName,
  component: Telegram,
  optional: false,
  property: {
    label: 'Telegram',
    placeholder: 'Enter a Telegram Account',
    name: 'telegram'
  },
  displayRender(info) {
    return (
      <div className="flex flex-1 items-center justify-between">
        <span className="body-m flex items-center  text-neutral-off-black">Telegram</span>
        <span className="body-m text-neutral-off-black">{info.telegram ?? ''}</span>
      </div>
    );
  },
  getValidator(config) {
    const validator = z.string().min(config.optional ? 0 : 1);
    return {
      telegram: config.optional ? validator.optional() : validator
    };
  }
};

export default TelegramConfig;
