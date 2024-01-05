import { cn } from '@/helper/utils';
import { ClassValue } from 'clsx';
import { FC, useEffect, useState } from 'react';

interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  // className?: string;
  isCircle?: boolean;
  outClassNames?: ClassValue;
  innerClassNames?: ClassValue;
}

const Checkbox: FC<CheckboxProps> = (props) => {
  const {
    checked: propsChecked = false,
    onChange,
    outClassNames,
    innerClassNames,
    isCircle = false
  } = props;

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
      <input type="checkbox" className="hidden" checked={checked} readOnly />
      <div
        className={cn(
          'w-[20px] h-[20px] border border-electives-filter-border-color block',
          isCircle ? 'rounded-full' : 'rounded-[3px]',
          outClassNames
        )}
      >
        {checked ? (
          <span
            className={cn(
              `w-full h-full bg-learning-track-line-bg block scale-[0.7]`,
              isCircle ? 'rounded-full' : 'rounded-[3px]',
              innerClassNames
            )}
          ></span>
        ) : null}
      </div>
    </div>
  );
};

export default Checkbox;
