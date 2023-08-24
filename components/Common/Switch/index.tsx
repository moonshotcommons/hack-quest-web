import { FC, ReactNode, useState } from 'react';
import { Switch as BaseSwitch } from '@headlessui/react';
interface SwitchProps {
  // children: ReactNode;
  defaultValue?: boolean;
  onChange: (v: boolean) => void;
}

const Switch: FC<SwitchProps> = (props) => {
  const { onChange, defaultValue } = props;
  const [enabled, setEnabled] = useState(defaultValue);
  return (
    <BaseSwitch
      checked={enabled}
      onChange={() => {
        setEnabled(!enabled);
        onChange(!enabled);
      }}
      className={`${
        enabled ? 'bg-primary-color' : 'bg-neutral-dark-gray'
      } relative inline-flex h-[1.25rem] w-[2rem] items-center rounded-full`}
    >
      <span
        className={`${
          enabled ? 'translate-x-[.875rem]' : 'translate-x-1'
        } inline-block h-[.875rem] w-[.875rem] transform rounded-full bg-white transition`}
      />
    </BaseSwitch>
  );
};

export default Switch;
