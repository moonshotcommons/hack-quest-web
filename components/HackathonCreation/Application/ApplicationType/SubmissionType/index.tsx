import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';

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

export const SubmissionTypeConfig: PresetComponentConfig<SubmissionTypeProps> = {
  id: v4(),
  type: SubmissionType.displayName,
  component: SubmissionType,
  settingComponent: null,
  optional: false,
  property: {},
  getValidator(config) {
    return {};
  }
};

export default SubmissionTypeConfig;
