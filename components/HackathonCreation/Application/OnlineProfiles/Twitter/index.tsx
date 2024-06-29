import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface TwitterProps {
  form: any;
  config: CustomComponentConfig;
}

const Twitter: FC<TwitterProps> = ({ config: propConfig, form }) => {
  const config = {
    ...propConfig,
    type: 'input'
  };
  return renderFormComponent(config as CustomComponentConfig, form);
};

Twitter.displayName = 'Twitter';

export const TwitterConfig: PresetComponentConfig<TwitterProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: Twitter.displayName,
  component: Twitter,
  optional: false,
  property: {
    label: 'Twitter',
    placeholder: 'Enter a Twitter Account',
    name: 'twitter'
  },
  getValidator(config) {
    const validator = z.string().min(config.optional ? 0 : 1);
    return {
      twitter: config.optional ? validator.optional() : validator
    };
  }
};

export default TwitterConfig;
