import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
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
  getValidator(config) {
    const validator = z.string().min(config.optional ? 0 : 1);
    return {
      discord: config.optional ? validator.optional() : validator
    };
  }
};

export default DiscordConfig;
