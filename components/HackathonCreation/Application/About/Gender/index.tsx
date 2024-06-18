import FormRadioItem from '@/components/Common/FormComponent/FormRadio/FormRadioItem';
import FormRadio from '@/components/Common/FormComponent/FormRadio';
import { getValidateResult } from '@/components/HackathonCreation/constants';
import { PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface GenderProps {
  form: any;
}

const GENDER = ['Man', 'Woman', 'Others'];

const Gender: FC<GenderProps> = ({ form }) => {
  return (
    <FormRadio name="gender" form={form} label="Gender">
      {GENDER.map((gender) => (
        <FormRadioItem value={gender} key={gender} label={gender} />
      ))}
    </FormRadio>
  );
};

Gender.displayName = 'Gender';

export const GenderConfig: PresetComponentConfig<GenderProps> = {
  id: v4(),
  type: Gender.displayName,
  optional: false,
  component: Gender,
  property: {},
  validate(values: { gender: string }, form) {
    return [
      getValidateResult(
        z.enum(['Man', 'Woman', 'Others'], { required_error: 'You need to select a gender' }).safeParse(values.gender),
        form,
        'gender'
      )
    ];
  }
};

export default GenderConfig;
