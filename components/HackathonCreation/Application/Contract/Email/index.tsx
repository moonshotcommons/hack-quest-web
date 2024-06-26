import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { getValidateResult } from '@/components/HackathonCreation/constants';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface EmailProps {
  form: any;
  config: CustomComponentConfig;
}

const Email: FC<EmailProps> = ({ config: propConfig, form }) => {
  const config = {
    ...propConfig,
    type: 'input'
  };
  return renderFormComponent(config as CustomComponentConfig, form);
};

Email.displayName = 'Email';

export const EmailConfig: PresetComponentConfig<EmailProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: Email.displayName,
  component: Email,
  optional: false,
  property: {
    label: 'Email',
    placeholder: 'Enter an Email address',
    name: 'email'
  },
  validate(values: { email: string }, form) {
    return [getValidateResult(z.string().min(10).max(100).safeParse(values.email), form, 'email')];
  }
};

export default EmailConfig;
