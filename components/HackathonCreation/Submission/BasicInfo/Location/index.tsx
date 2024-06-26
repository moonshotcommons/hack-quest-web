import { FormSelect } from '@/components/Common/FormComponent';
import { getValidateResult } from '@/components/HackathonCreation/constants';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';
import { LOCATIONS } from './constant';

interface LocationProps {
  form: any;
  config: CustomComponentConfig;
}

const Location: FC<LocationProps> = ({ config: propConfig, form }) => {
  return (
    <FormSelect
      form={form}
      label="Where are you located?"
      name="location"
      placeholder="Please select"
      items={LOCATIONS}
    ></FormSelect>
  );
};

Location.displayName = 'Location';

export const LocationConfig: PresetComponentConfig<LocationProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: Location.displayName,
  component: Location,
  optional: false,
  property: {},
  validate(values: { location: string }, form) {
    return [getValidateResult(z.string().min(10).max(100).safeParse(values.location), form, 'location')];
  }
};

export default LocationConfig;
