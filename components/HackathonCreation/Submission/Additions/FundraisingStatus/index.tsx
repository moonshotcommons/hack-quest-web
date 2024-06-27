import FormTextarea from '@/components/Common/FormComponent/FormTextarea';
import { getValidateResult } from '@/components/HackathonCreation/constants';
import { PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

export interface fundraisingStatusProps {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  maxField: number;
  validator?: any;
}

const fundraisingStatus: FC<fundraisingStatusProps> = (props) => {
  return <FormTextarea {...props} />;
};

fundraisingStatus.displayName = 'fundraisingStatus';

export const fundraisingStatusConfig: PresetComponentConfig<fundraisingStatusProps> = {
  id: v4(),
  type: fundraisingStatus.displayName,
  optional: false,
  component: fundraisingStatus,
  property: {
    name: 'fundraisingStatus',
    label: 'Fundraising Status',
    placeholder: 'Describe your fundraising status',
    maxField: 600
  },
  validate(values: { fundraisingStatus: string }, form, config) {
    return [
      getValidateResult(
        z
          .string()
          .min(config.optional ? 0 : 1)
          .max(600)
          .safeParse(values.fundraisingStatus),
        form,
        'fundraisingStatus'
      )
    ];
  }
};

export default fundraisingStatusConfig;
