import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { getValidateResult } from '@/components/HackathonCreation/constants';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface LinkedInProps {
  form: any;
  config: CustomComponentConfig;
}

const LinkedIn: FC<LinkedInProps> = ({ config: propConfig, form }) => {
  const config = {
    ...propConfig,
    type: 'input'
  };
  return renderFormComponent(config as CustomComponentConfig, form);
};

LinkedIn.displayName = 'LinkedIn';

export const LinkedInConfig: PresetComponentConfig<LinkedInProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: LinkedIn.displayName,
  component: LinkedIn,
  optional: false,
  property: {
    label: 'LinkedIn',
    placeholder: 'Enter a LinkedIn Account',
    name: 'linkedIn'
  },
  validate(values: { linkedIn: string }, form) {
    return [getValidateResult(z.string().min(10).max(100).safeParse(values.linkedIn), form, 'linkedIn')];
  }
};

export default LinkedInConfig;
