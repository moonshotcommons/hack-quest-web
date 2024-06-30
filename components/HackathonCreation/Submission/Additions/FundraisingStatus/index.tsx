import FormTextarea from '@/components/Common/FormComponent/FormTextarea';
import { PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

export interface FundraisingStatusProps {
  form: any;
  config: PresetComponentConfig;
  name: string;
  label: string;
  placeholder: string;
  maxField: number;
  validator?: any;
}

const FundraisingStatus: FC<FundraisingStatusProps> = ({ config, label, ...rest }) => {
  const requiredTag = config.optional ? ' (Optional)' : '*';
  return <FormTextarea {...rest} label={label + requiredTag} />;
};

FundraisingStatus.displayName = 'FundraisingStatus';

export const FundraisingStatusConfig: PresetComponentConfig<FundraisingStatusProps> = {
  id: v4(),
  type: FundraisingStatus.displayName,
  optional: false,
  component: FundraisingStatus,
  property: {
    name: 'fundraisingStatus',
    label: 'Fundraising Status',
    placeholder: 'Describe your fundraising status',
    maxField: 600
  },
  displayRender(info) {
    return (
      <>
        <div className="my-4 h-[1px] w-full scale-y-50 border-none bg-neutral-medium-gray" />
        <div className="body-m flex flex-col gap-1 text-neutral-off-black">
          <span>Fundraising Status</span>
          <p className="body-s min-h-[80px] w-full leading-normal text-neutral-rich-gray">
            {info.fundraisingStatus ?? ''}
          </p>
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
      fundraisingStatus: config.optional ? validator.optional() : validator
    };
  }
};

export default FundraisingStatusConfig;
