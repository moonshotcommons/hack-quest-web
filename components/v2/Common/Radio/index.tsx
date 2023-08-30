import { cn } from '@/helper/utils';
import { FC } from 'react';

interface RadioProps {
  checked: boolean;
  disabled?: boolean;
  onChange?: () => void;
  className?: string;
}

const Radio: FC<RadioProps> = (props) => {
  const { onChange, className, checked, disabled } = props;

  return (
    <div
      className={`${
        disabled ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer'
      }`}
      onClick={() => onChange?.()}
    >
      <input
        type="radio"
        className="hidden"
        checked={checked}
        onChange={() => {}}
      />
      <span className="w-[20px] h-[20px] border border-solid rounded-full border-selective-courses-filter-border-color block">
        {checked ? (
          <span
            className={cn(
              `rounded-full w-full h-full bg-learning-track-line-bg block scale-[0.7]`,
              className
            )}
          ></span>
        ) : null}
      </span>
    </div>
  );
};

export default Radio;
