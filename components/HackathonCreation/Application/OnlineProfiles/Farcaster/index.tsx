import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
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
  displayRender(info) {
    return (
      <div className="flex flex-1 items-center justify-between">
        <span className="body-m flex items-center  text-neutral-off-black">Farcaster</span>
        <span className="body-m text-neutral-off-black">{info.farcaster ?? ''}</span>
      </div>
    );
  },
  getValidator(config) {
    const validator = z.string().min(config.optional ? 0 : 1);
    return {
      farcaster: config.optional ? validator.optional() : validator
    };
  }
};

export default FarcasterConfig;
