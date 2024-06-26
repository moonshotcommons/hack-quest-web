import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { getValidateResult } from '@/components/HackathonCreation/constants';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface PhoneNumberProps {
  form: any;
  config: CustomComponentConfig;
}

const PhoneNumber: FC<PhoneNumberProps> = ({ config: propConfig, form }) => {
  const config = {
    ...propConfig,
    type: 'input'
  };
  return renderFormComponent(config as CustomComponentConfig, form);
};

PhoneNumber.displayName = 'PhoneNumber';

export const PhoneNumberConfig: PresetComponentConfig<PhoneNumberProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: PhoneNumber.displayName,
  component: PhoneNumber,
  optional: false,
  property: {
    label: 'Phone Number',
    placeholder: 'Enter you phone number',
    name: 'phoneNumber'
  },
  validate(values: { phoneNumber: string }, form) {
    return [getValidateResult(z.string().min(10).max(100).safeParse(values.phoneNumber), form, 'phoneNumber')];
  }
};

export default PhoneNumberConfig;
