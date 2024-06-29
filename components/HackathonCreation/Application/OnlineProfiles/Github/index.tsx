import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface GithubProps {
  form: any;
  config: CustomComponentConfig;
}

const Github: FC<GithubProps> = ({ config: propConfig, form }) => {
  const config = {
    ...propConfig,
    type: 'input'
  };
  return renderFormComponent(config as CustomComponentConfig, form);
};

Github.displayName = 'GitHub';

export const GithubConfig: PresetComponentConfig<GithubProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: Github.displayName,
  component: Github,
  optional: false,
  required: true,
  property: {
    label: 'Github',
    placeholder: 'Enter a GitHub Account',
    name: 'github'
  },
  getValidator(config) {
    const validator = z.string().min(config.optional ? 0 : 1);
    return {
      github: config.optional ? validator.optional() : validator
    };
  }
};

export default GithubConfig;
