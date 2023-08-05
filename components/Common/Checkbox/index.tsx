import { cn } from '@/helper/utils';
import { FC, ReactNode, useEffect, useState } from 'react';

interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const Checkbox: FC<CheckboxProps> = (props) => {
  const { checked: propsChecked = false, onChange, className } = props;

  const [checked, setChecked] = useState(propsChecked);

  useEffect(() => {
    setChecked(propsChecked);
  }, [propsChecked]);

  return (
    <div
      onClick={() => {
        setChecked(!checked);
        onChange?.(!checked);
      }}
      className="cursor-pointer"
    >
      <input type="checkbox" className="hidden" checked={checked} />
      <span className="w-[1.5rem] h-[1.5rem] border border-solid rounded-full border-auth-input-checkbox-border-color block">
        {checked ? (
          <span
            className={cn(
              `rounded-full w-full h-full bg-auth-input-checkbox-bg block scale-50 hover:bg-auth-input-checkbox-hover-bg`,
              className
            )}
          ></span>
        ) : null}
      </span>
    </div>
  );
};

export default Checkbox;
