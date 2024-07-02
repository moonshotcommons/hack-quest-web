import FormTextarea from '@/components/Common/FormComponent/FormTextarea';
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
  config: PresetComponentConfig;
}

const DetailedIntro: FC<DetailedIntroProps> = ({ config, label, ...props }) => {
  const requiredTag = config.optional ? ' (Optional)' : '*';
  return <FormTextarea {...props} className="h-[76px]" label={label + requiredTag} />;
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
  displayRender(info) {
    return (
      <>
        <div className="my-4 h-[1px] w-full scale-y-50 border-none bg-neutral-medium-gray" />
        <div className="body-m flex flex-col gap-1 text-neutral-off-black">
          <span>Detailed Intro of Your Project</span>
          <p className="body-s min-h-[80px] w-full leading-normal text-neutral-rich-gray">{info.detailedIntro ?? ''}</p>
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
      detailedIntro: config.optional ? validator.optional() : validator
    };
  }
};

export default DetailedIntroConfig;
