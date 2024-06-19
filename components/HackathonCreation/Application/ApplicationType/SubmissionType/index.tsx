import { getValidateResult } from '@/components/HackathonCreation/constants';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface SubmissionTypeProps {
  form: any;
  config: CustomComponentConfig;
  type?: 'Solo or Group' | 'Solo Only' | 'Group Only';
  minSize?: number;
  maxSize?: number;
}

const SubmissionType: FC<SubmissionTypeProps> = ({ config, form }) => {
  const props = config.property;

  return <div></div>;
};

SubmissionType.displayName = 'SubmissionType';

export const SubmissionTypeConfig: PresetComponentConfig<SubmissionTypeProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: SubmissionType.displayName,
  component: SubmissionType,
  settingComponent: null,
  optional: false,
  property: {},
  validate(values: { SubmissionType: string }, form) {
    return [getValidateResult(z.string().min(10).max(100).safeParse(values.SubmissionType), form, 'SubmissionType')];
  }
};

export default SubmissionTypeConfig;
