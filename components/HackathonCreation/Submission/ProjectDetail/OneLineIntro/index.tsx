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
  config: PresetComponentConfig;
}

const OneLineIntro: FC<OneLineIntroProps> = ({ config, label, ...props }) => {
  const requiredTag = config.optional ? ' (Optional)' : '*';
  return <FormTextarea {...props} className="h-[76px]" label={label + requiredTag} />;
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
  displayRender(info) {
    return (
      <>
        <div className="my-4 h-[1px] w-full scale-y-50 border-none bg-neutral-medium-gray" />
        <div className="body-m flex flex-col gap-1 text-neutral-off-black">
          <span>One Line Intro of Your Project</span>
          <p className="body-s min-h-[80px] w-full leading-normal text-neutral-rich-gray">{info.oneLineIntro ?? ''}</p>
        </div>
      </>
    );
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
