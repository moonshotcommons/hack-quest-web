import FormTextarea from '@/components/Common/FormComponent/FormTextarea';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
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
  config: CustomComponentConfig;
}

const Bio: FC<BioProps> = ({ config, label, ...rest }) => {
  const requiredTag = config.optional ? '' : '*';
  return <FormTextarea {...rest} label={label + requiredTag} />;
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
  getValidator(config) {
    const validator = z
      .string()
      .min(config.optional ? 0 : 1)
      .max(360);
    return {
      bio: config.optional ? validator.optional() : validator
    };
  }
};

export default BioConfig;
