import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
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
  displayRender(info) {
    return (
      <div className="flex flex-1 items-center justify-between">
        <span className="body-m flex items-center  text-neutral-off-black">LinkedIn</span>
        <span className="body-m text-neutral-off-black">{info.linkedIn ?? ''}</span>
      </div>
    );
  },
  getValidator(config) {
    const validator = z.string().min(config.optional ? 0 : 1);
    return {
      linkedIn: config.optional ? validator.optional() : validator
    };
  }
};

export default LinkedInConfig;
