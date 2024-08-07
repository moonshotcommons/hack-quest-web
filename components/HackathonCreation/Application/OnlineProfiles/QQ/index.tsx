import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
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
  displayRender(info) {
    return (
      <div className="flex flex-1 items-center justify-between">
        <span className="body-m flex items-center  text-neutral-off-black">QQ</span>
        <span className="body-m text-neutral-off-black">{info.qq ?? ''}</span>
      </div>
    );
  },
  getValidator(config) {
    const validator = z.string().min(config.optional ? 0 : 1);
    return {
      qq: config.optional ? validator.optional() : validator
    };
  }
};

export default QQConfig;
