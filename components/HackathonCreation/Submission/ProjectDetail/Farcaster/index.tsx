import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { getValidateResult } from '@/components/HackathonCreation/constants';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface FarcasterProps {
  form: any;
  config: CustomComponentConfig;
}

const Farcaster: FC<FarcasterProps> = ({ config: propConfig, form }) => {
  const config = {
    ...propConfig,
    type: 'input'
  };
  return renderFormComponent(config as CustomComponentConfig, form);
};

Farcaster.displayName = 'Farcaster';

export const FarcasterConfig: PresetComponentConfig<FarcasterProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: Farcaster.displayName,
  component: Farcaster,
  optional: false,
  property: {
    label: 'Farcaster',
    placeholder: 'Enter a Farcaster Account',
    name: 'farcaster'
  },
  validate(values: { farcaster: string }, form) {
    return [getValidateResult(z.string().min(10).max(100).safeParse(values.farcaster), form, 'farcaster')];
  }
};

export default FarcasterConfig;
