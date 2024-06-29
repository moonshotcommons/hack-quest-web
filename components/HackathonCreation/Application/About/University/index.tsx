import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface UniversityProps {
  form: any;
  config: CustomComponentConfig;
}

const University: FC<UniversityProps> = ({ config: propConfig, form }) => {
  const config = {
    ...propConfig,
    type: 'input'
  };
  return renderFormComponent(config as CustomComponentConfig, form);
};

University.displayName = 'University';

export const UniversityConfig: PresetComponentConfig<UniversityProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: University.displayName,
  component: University,
  optional: false,
  property: {
    label: 'University',
    name: 'university',
    placeholder: 'e.g. Cambridge University'
  },
  getValidator(config) {
    const validator = z.string().min(config.optional ? 0 : 1);
    return {
      university: config.optional ? validator.optional() : validator
    };
  }
};

export default UniversityConfig;
