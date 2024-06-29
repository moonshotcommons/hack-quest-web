import FormRadioItem from '@/components/Common/FormComponent/FormRadio/FormRadioItem';
import FormRadio from '@/components/Common/FormComponent/FormRadio';
import { PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface GenderProps {
  form: any;
  config: PresetComponentConfig;
}

const GENDER = ['Man', 'Woman', 'Others'];

const Gender: FC<GenderProps> = ({ form, config }) => {
  const requiredTag = config.optional ? '' : '*';
  return (
    <FormRadio name="gender" form={form} label={'Gender' + requiredTag}>
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
  getValidator(config) {
    // const validator = z.enum(['Man', 'Woman', 'Others'], { required_error: 'You need to select a gender' });
    const validator = z.string().min(config.optional ? 0 : 1);
    return {
      gender: config.optional ? validator.optional() : validator
    };
  }
};

export default GenderConfig;
