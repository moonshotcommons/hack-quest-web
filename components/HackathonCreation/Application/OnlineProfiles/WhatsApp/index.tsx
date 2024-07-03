import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
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
  displayRender(info) {
    return (
      <div className="flex flex-1 items-center justify-between">
        <span className="body-m flex items-center  text-neutral-off-black">WhatsApp</span>
        <span className="body-m text-neutral-off-black">{info.whatsApp ?? ''}</span>
      </div>
    );
  },
  getValidator(config) {
    const validator = z.string().min(config.optional ? 0 : 1);
    return {
      whatsApp: config.optional ? validator.optional() : validator
    };
  }
};

export default WhatsAppConfig;
