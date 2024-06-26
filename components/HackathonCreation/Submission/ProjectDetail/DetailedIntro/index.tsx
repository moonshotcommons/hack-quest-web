import FormTextarea from '@/components/Common/FormComponent/FormTextarea';
import { getValidateResult } from '@/components/HackathonCreation/constants';
import { PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

export interface DetailedIntroProps {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  maxField: number;
  validator?: any;
}

const DetailedIntro: FC<DetailedIntroProps> = (props) => {
  return <FormTextarea {...props} className="h-[76px]" />;
};

DetailedIntro.displayName = 'DetailedIntro';

export const DetailedIntroConfig: PresetComponentConfig<DetailedIntroProps> = {
  id: v4(),
  type: DetailedIntro.displayName,
  optional: false,
  component: DetailedIntro,
  property: {
    name: 'detailedIntro',
    label: 'Detailed Intro of Your Project',
    placeholder: 'What problem does your project want to solve, how does it solve the problem, business model, etc.',
    maxField: 600
  },
  validate(values: { detailedIntro: string }, form) {
    return [getValidateResult(z.string().min(10).max(600).safeParse(values.detailedIntro), form, 'detailedIntro')];
  }
};

export default DetailedIntroConfig;
