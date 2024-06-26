import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { getValidateResult } from '@/components/HackathonCreation/constants';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface DiscordProps {
  form: any;
  config: CustomComponentConfig;
}

const Discord: FC<DiscordProps> = ({ config: propConfig, form }) => {
  const config = {
    ...propConfig,
    type: 'input'
  };
  return renderFormComponent(config as CustomComponentConfig, form);
};

Discord.displayName = 'Discord';

export const DiscordConfig: PresetComponentConfig<DiscordProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: Discord.displayName,
  component: Discord,
  optional: false,
  property: {
    label: 'Discord',
    placeholder: 'Enter a Discord Account',
    name: 'discord'
  },
  validate(values: { discord: string }, form) {
    return [getValidateResult(z.string().min(10).max(100).safeParse(values.discord), form, 'discord')];
  }
};

export default DiscordConfig;
