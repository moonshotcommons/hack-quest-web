import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { useUserStore } from '@/store/zustand/userStore';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface EmailProps {
  form: any;
  config: CustomComponentConfig;
}

const Email: FC<EmailProps> = ({ config: propConfig, form }) => {
  const config = {
    ...propConfig,
    type: 'input'
  };

  const user = useUserStore((state) => state.userInfo);
  if (user && user.email) {
    (config.property as any).defaultValue = user.email;
    (config.property as any).disabled = true;
  }

  return renderFormComponent(config as CustomComponentConfig, form);
};

Email.displayName = 'Email';

export const EmailConfig: PresetComponentConfig<EmailProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: Email.displayName,
  component: Email,
  optional: false,
  property: {
    label: 'Email',
    placeholder: 'Enter an Email address',
    name: 'email'
  },
  displayRender(info) {
    return (
      <div className="flex flex-1 items-center justify-between">
        <span className="body-m flex items-center  text-neutral-off-black">Email</span>
        <span className="body-m text-neutral-off-black">{info.email ?? ''}</span>
      </div>
    );
  },
  getValidator(config) {
    const validator = z.string().email();
    return {
      email: config.optional ? validator.optional() : validator
    };
  }
};

export default EmailConfig;
