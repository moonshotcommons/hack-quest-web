import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { getValidateResult } from '@/components/HackathonCreation/constants';
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
    name: 'Twitter'
  },
  validate(values: { twitter: string }, form) {
    return [getValidateResult(z.string().min(10).max(100).safeParse(values.twitter), form, 'twitter')];
  }
};

export default TwitterConfig;
