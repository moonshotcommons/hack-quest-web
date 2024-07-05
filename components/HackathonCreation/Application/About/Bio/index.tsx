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
  const requiredTag = config.optional ? ' (Optional)' : '*';
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
  displayRender(info) {
    return (
      <>
        <div className="my-4 h-[1px] w-full scale-y-50 border-none bg-neutral-medium-gray" />
        <div className="body-m flex flex-col gap-1 text-neutral-off-black">
          <span>Bio</span>
          <p className="body-s min-h-[80px] w-full leading-normal text-neutral-rich-gray">{info.bio ?? ''}</p>
        </div>
      </>
    );
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
