import FormInput from '@/components/Common/FormComponent/FormInput';
import { getValidateResult } from '@/components/HackathonCreation/constants';
import { PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface FirstNameAndLastNameProps {
  form: any;
  config: PresetComponentConfig;
}

const FirstNameAndLastName: FC<FirstNameAndLastNameProps> = ({ form }) => {
  return (
    <div className="flex justify-between gap-4">
      <FormInput form={form} placeholder="Enter your first name" label="First Name" name={'firstName'} />
      <FormInput form={form} placeholder="Enter your last name" label="Last Name" name="lastName" />
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
  validate(values: { firstName: string; lastName: string }, form, config) {
    const { firstName, lastName } = values;
    return [
      getValidateResult(
        z
          .string()
          .min(config.optional ? 0 : 1)
          .max(30)
          .safeParse(firstName),
        form,
        'firstName'
      ),
      getValidateResult(
        z
          .string()
          .min(config.optional ? 0 : 1)
          .max(30)
          .safeParse(lastName),
        form,
        'lastName'
      )
    ];
  }
};

export default FirstNameAndLastNameConfig;
