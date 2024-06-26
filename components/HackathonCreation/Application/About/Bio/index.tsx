import FormTextarea from '@/components/Common/FormComponent/FormTextarea';
import { getValidateResult } from '@/components/HackathonCreation/constants';
import { PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

export interface BioProps {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  maxField: number;
  validator?: any;
}

const Bio: FC<BioProps> = (props) => {
  return <FormTextarea {...props} />;
};

Bio.displayName = 'Bio';

export const BioConfig: PresetComponentConfig<BioProps> = {
  id: v4(),
  type: Bio.displayName,
  optional: false,
  component: Bio,
  property: {
    name: 'bio',
    label: 'Bio',
    placeholder: '',
    maxField: 360
  },
  validate(values: { bio: string }, form, config) {
    return [
      getValidateResult(
        z
          .string()
          .min(config.optional ? 0 : 1)
          .max(360)
          .safeParse(values.bio),
        form,
        'bio'
      )
    ];
  }
};

export default BioConfig;
