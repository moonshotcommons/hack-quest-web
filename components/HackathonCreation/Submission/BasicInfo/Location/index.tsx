import { FormSelect } from '@/components/Common/FormComponent';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';
import { LOCATIONS } from './constant';

interface LocationProps {
  form: any;
  config: CustomComponentConfig;
}

const Location: FC<LocationProps> = ({ config, form }) => {
  const requiredTag = config.optional ? '' : '*';
  return (
    <FormSelect
      form={form}
      label={'Where are you located?' + requiredTag}
      name="location"
      placeholder="Please select"
      items={LOCATIONS}
    ></FormSelect>
  );
};

Location.displayName = 'SubmissionLocation';

export const LocationConfig: PresetComponentConfig<LocationProps> = {
  id: v4(),
  type: Location.displayName,
  component: Location,
  optional: false,
  property: {},
  getValidator(config) {
    const arr = LOCATIONS.map((item) => item.value) as [string, ...string[]];
    const validator = z.enum(arr);
    return {
      location: config.optional ? validator.optional() : validator
    };
  }
};

export default LocationConfig;
