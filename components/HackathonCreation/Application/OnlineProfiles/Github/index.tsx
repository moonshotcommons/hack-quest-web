import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { getValidateResult } from '@/components/HackathonCreation/constants';
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

Github.displayName = 'Github';

export const GithubConfig: PresetComponentConfig<GithubProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: Github.displayName,
  component: Github,
  optional: false,
  property: {
    label: 'Github',
    placeholder: 'Enter a GitHub Account',
    name: 'github'
  },
  validate(values: { github: string }, form) {
    return [getValidateResult(z.string().min(10).max(100).safeParse(values.github), form, 'github')];
  }
};

export default GithubConfig;
