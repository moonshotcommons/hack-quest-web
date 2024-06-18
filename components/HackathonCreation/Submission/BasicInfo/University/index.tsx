import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { getValidateResult } from '@/components/HackathonCreation/constants';
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
  validate(values: { university: string }, form) {
    return [getValidateResult(z.string().min(10).max(100).safeParse(values.university), form, 'university')];
  }
};

export default UniversityConfig;
