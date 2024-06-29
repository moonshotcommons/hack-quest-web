import FormTextarea from '@/components/Common/FormComponent/FormTextarea';
import { PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

export interface OneLineIntroProps {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  maxField: number;
  validator?: any;
}

const OneLineIntro: FC<OneLineIntroProps> = (props) => {
  return <FormTextarea {...props} className="h-[76px]" />;
};

OneLineIntro.displayName = 'OneLineIntro';

export const OneLineIntroConfig: PresetComponentConfig<OneLineIntroProps> = {
  id: v4(),
  type: OneLineIntro.displayName,
  optional: false,
  component: OneLineIntro,
  property: {
    name: 'oneLineIntro',
    label: 'One Line Intro of Your Project',
    placeholder: 'Enter your one line intro',
    maxField: 120
  },
  getValidator(config) {
    const validator = z
      .string()
      .min(config.optional ? 0 : 1)
      .max(120);
    return {
      oneLineIntro: config.optional ? validator.optional() : validator
    };
  }
};

export default OneLineIntroConfig;
