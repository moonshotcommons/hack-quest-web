import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
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
  getValidator(config) {
    const validator = z.string().email();
    return {
      email: config.optional ? validator.optional() : validator
    };
  }
};

export default EmailConfig;
