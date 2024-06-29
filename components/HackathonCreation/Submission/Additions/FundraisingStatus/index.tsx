import FormTextarea from '@/components/Common/FormComponent/FormTextarea';
import { PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

export interface FundraisingStatusProps {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  maxField: number;
  validator?: any;
}

const FundraisingStatus: FC<FundraisingStatusProps> = (props) => {
  return <FormTextarea {...props} />;
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
  getValidator(config) {
    const validator = z
      .string()
      .min(config.optional ? 0 : 1)
      .max(600);
    return {
      prizeTrack: config.optional ? validator.optional() : validator
    };
  }
};

export default FundraisingStatusConfig;
