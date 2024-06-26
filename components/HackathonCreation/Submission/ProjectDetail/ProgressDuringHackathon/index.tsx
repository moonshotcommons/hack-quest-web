import FormTextarea from '@/components/Common/FormComponent/FormTextarea';
import { getValidateResult } from '@/components/HackathonCreation/constants';
import { PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

export interface ProgressDuringHackathonProps {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  maxField: number;
  validator?: any;
}

const ProgressDuringHackathon: FC<ProgressDuringHackathonProps> = (props) => {
  return <FormTextarea {...props} className="h-[76px]" />;
};

ProgressDuringHackathon.displayName = 'ProgressDuringHackathon';

export const ProgressDuringHackathonConfig: PresetComponentConfig<ProgressDuringHackathonProps> = {
  id: v4(),
  type: ProgressDuringHackathon.displayName,
  optional: false,
  component: ProgressDuringHackathon,
  property: {
    name: 'progressDuringHackathon',
    label: 'Progress During Hackathon',
    placeholder: 'Describe how your team work on the hackathon project step by step',
    maxField: 600
  },
  validate(values: { progressDuringHackathon: string }, form) {
    return [
      getValidateResult(
        z.string().min(10).max(600).safeParse(values.progressDuringHackathon),
        form,
        'progressDuringHackathon'
      )
    ];
  }
};

export default ProgressDuringHackathonConfig;
