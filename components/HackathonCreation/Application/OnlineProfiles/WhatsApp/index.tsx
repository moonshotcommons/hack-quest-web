import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { getValidateResult } from '@/components/HackathonCreation/constants';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface WhatsAppProps {
  form: any;
  config: CustomComponentConfig;
}

const WhatsApp: FC<WhatsAppProps> = ({ config: propConfig, form }) => {
  const config = {
    ...propConfig,
    type: 'input'
  };
  return renderFormComponent(config as CustomComponentConfig, form);
};

WhatsApp.displayName = 'WhatsApp';

export const WhatsAppConfig: PresetComponentConfig<WhatsAppProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: WhatsApp.displayName,
  component: WhatsApp,
  optional: false,
  property: {
    label: 'WhatsApp',
    placeholder: 'Enter a WhatsApp Account',
    name: 'whatsApp'
  },
  validate(values: { whatsApp: string }, form) {
    return [getValidateResult(z.string().min(10).max(100).safeParse(values.whatsApp), form, 'whatsApp')];
  }
};

export default WhatsAppConfig;
