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
        disabled ? 'pointer-events-none cursor-not-allowed' : 'cursor-pointer'
      }`}
      onClick={() => onChange?.()}
    >
      <input
        type="radio"
        className="hidden"
        checked={checked}
        onChange={() => {}}
      />
      <span className="block h-[20px] w-[20px] rounded-full border border-solid border-electives-filter-border-color">
        {checked ? (
          <span
            className={cn(
              `block h-full w-full scale-[0.7] rounded-full bg-learning-track-line-bg`,
              className
            )}
          ></span>
        ) : null}
      </span>
    </div>
  );
};

export default Radio;
