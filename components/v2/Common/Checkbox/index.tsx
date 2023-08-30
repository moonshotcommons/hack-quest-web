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
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={() => {}}
      />
      <div className="w-[20px] h-[20px] border rounded-[3px] border-selective-courses-filter-border-color block">
        {checked ? (
          <span
            className={cn(
              `rounded-[3px] w-full h-full bg-learning-track-line-bg block scale-[0.7]`,
              className
            )}
          ></span>
        ) : null}
      </div>
    </div>
  );
};

export default Checkbox;
