import { cn } from '@/helper/utils';
import { FC } from 'react';

interface RadioProps {
  parentValue: string;
  value: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  radioName: string;
}

const Radio: FC<RadioProps> = (props) => {
  const { value, onChange, className, radioName, parentValue, disabled } =
    props;

  return (
    <div
      className={`${
        disabled ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer'
      }`}
      onClick={() => onChange?.(value)}
    >
      <input type="radio" className="hidden" value={value} name={radioName} />
      <span className="w-[20px] h-[20px] border border-solid rounded-full border-selective-courses-filter-border-color block">
        {parentValue === value ? (
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
