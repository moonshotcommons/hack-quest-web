import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { getValidateResult } from '@/components/HackathonCreation/constants';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface QQProps {
  form: any;
  config: CustomComponentConfig;
}

const QQ: FC<QQProps> = ({ config: propConfig, form }) => {
  const config = {
    ...propConfig,
    type: 'input'
  };
  return renderFormComponent(config as CustomComponentConfig, form);
};

QQ.displayName = 'QQ';

export const QQConfig: PresetComponentConfig<QQProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: QQ.displayName,
  component: QQ,
  optional: false,
  property: {
    label: 'QQ',
    placeholder: 'Enter a QQ Account',
    name: 'qq'
  },
  validate(values: { qq: string }, form) {
    return [getValidateResult(z.string().min(10).max(100).safeParse(values.qq), form, 'qq')];
  }
};

export default QQConfig;
