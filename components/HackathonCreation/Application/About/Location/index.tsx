import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface LocationProps {
  form: any;
  config: CustomComponentConfig;
}

const Location: FC<LocationProps> = ({ config: propConfig, form }) => {
  const config = {
    ...propConfig,
    type: 'input'
  };
  return renderFormComponent(config as CustomComponentConfig, form);
};

Location.displayName = 'ApplicationLocation';

export const LocationConfig: PresetComponentConfig<LocationProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: Location.displayName,
  component: Location,
  optional: false,
  property: {
    label: 'Location',
    placeholder: 'e.g. Paris, France',
    name: 'location'
  },
  displayRender(info) {
    return (
      <div className="flex flex-1 items-center justify-between">
        <span className="body-m flex items-center  text-neutral-off-black">Location</span>
        <span className="body-m text-neutral-off-black">{info.location ?? ''}</span>
      </div>
    );
  },
  getValidator(config) {
    const validator = z.string().min(config.optional ? 0 : 1);
    return {
      location: config.optional ? validator.optional() : validator
    };
  }
};

export default LocationConfig;
