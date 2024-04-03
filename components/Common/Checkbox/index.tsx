'use client';

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
  const { checked: propsChecked = false, onChange, outClassNames, innerClassNames, isCircle = false } = props;

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
          'block h-[20px] w-[20px] border border-electives-filter-border-color',
          isCircle ? 'rounded-full' : 'rounded-[3px]',
          outClassNames
        )}
      >
        {checked ? (
          <span
            className={cn(
              `block h-full w-full scale-[0.7] bg-learning-track-line-bg`,
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
