import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { getValidateResult } from '@/components/HackathonCreation/constants';
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
  validate(values: { telegram: string }, form) {
    return [getValidateResult(z.string().min(10).max(100).safeParse(values.telegram), form, 'telegram')];
  }
};

export default TelegramConfig;
