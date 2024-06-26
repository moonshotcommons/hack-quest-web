import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { getValidateResult } from '@/components/HackathonCreation/constants';
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

Location.displayName = 'Location';

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
  validate(values: { location: string }, form, config) {
    return [
      getValidateResult(
        z
          .string()
          .min(config.optional ? 0 : 1)
          .max(100)
          .safeParse(values.location),
        form,
        'location'
      )
    ];
  }
};

export default LocationConfig;
