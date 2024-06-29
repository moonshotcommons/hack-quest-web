import FormInput from '@/components/Common/FormComponent/FormInput';
import { PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface FirstNameAndLastNameProps {
  form: any;
  config: PresetComponentConfig;
}

const FirstNameAndLastName: FC<FirstNameAndLastNameProps> = ({ form, config }) => {
  const requiredTag = config.optional ? '' : '*';
  return (
    <div className="flex justify-between gap-4">
      <FormInput
        form={form}
        placeholder="Enter your first name"
        label={'First Name' + requiredTag}
        name={'firstName'}
      />
      <FormInput form={form} placeholder="Enter your last name" label={'Last Name' + requiredTag} name="lastName" />
    </div>
  );
};

FirstNameAndLastName.displayName = 'First and Last Name';

export const FirstNameAndLastNameConfig: PresetComponentConfig<FirstNameAndLastNameProps> = {
  id: v4(),
  type: FirstNameAndLastName.displayName,
  optional: false,
  required: true,
  component: FirstNameAndLastName,
  property: {},
  getValidator(config) {
    const validator = z
      .string()
      .min(config.optional ? 0 : 1)
      .max(30);
    return {
      firstName: config.optional ? validator.optional() : validator,
      lastName: config.optional ? validator.optional() : validator
    };
  }
};

export default FirstNameAndLastNameConfig;
