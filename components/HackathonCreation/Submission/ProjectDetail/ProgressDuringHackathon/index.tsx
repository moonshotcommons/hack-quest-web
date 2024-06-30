import FormTextarea from '@/components/Common/FormComponent/FormTextarea';
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
    name: 'progress',
    label: 'Progress During Hackathon',
    placeholder: 'Describe how your team work on the hackathon project step by step',
    maxField: 600
  },
  displayRender(info) {
    return (
      <>
        <div className="my-4 h-[1px] w-full scale-y-50 border-none bg-neutral-medium-gray" />
        <div className="body-m flex flex-col gap-1 text-neutral-off-black">
          <span>Progress During Hackathon</span>
          <p className="body-s min-h-[80px] w-full leading-normal text-neutral-rich-gray">{info.progress ?? ''}</p>
        </div>
      </>
    );
  },
  getValidator(config) {
    const validator = z
      .string()
      .min(config.optional ? 0 : 1)
      .max(600);
    return {
      progress: config.optional ? validator.optional() : validator
    };
  }
};

export default ProgressDuringHackathonConfig;
