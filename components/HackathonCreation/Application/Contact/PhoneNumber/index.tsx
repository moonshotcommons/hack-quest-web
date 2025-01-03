import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
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
  displayRender(info) {
    return (
      <div className="flex flex-1 items-center justify-between">
        <span className="body-m flex items-center  text-neutral-off-black">Phone Number</span>
        <span className="body-m text-neutral-off-black">{info.phoneNumber ?? ''}</span>
      </div>
    );
  },
  getValidator(config) {
    const validator = z
      .string()
      .min(config.optional ? 0 : 6)
      .max(20);

    return {
      phoneNumber: config.optional ? validator.optional() : validator
    };
  }
};

export default PhoneNumberConfig;
