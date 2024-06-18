import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useControllableState } from '@/hooks/state/use-controllable-state';
import { cn } from '@/helper/utils';
import { noop } from '@/lib/utils';

interface SelectableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onCheckChange?: (checked: boolean) => void;
}

const SelectableCard = React.forwardRef<HTMLDivElement, SelectableCardProps>((props, ref) => {
  const { label, disabled = false, className, onCheckChange = noop } = props;

  const id = React.useId();

  const [checkedState = false, setCheckedState] = useControllableState(props, 'checked', onCheckChange);

  const [checked, setChecked] = React.useState(false);

  function onCheckedChange(checked: boolean) {
    setChecked(checked);
  }

  return (
    <div
      ref={ref}
      role="checkbox"
      aria-checked={checkedState}
      aria-disabled={disabled}
      data-state={checkedState ? 'checked' : 'unchecked'}
      onClick={() => setCheckedState(!checkedState)}
      className={cn(
        'inline-flex h-[74px] cursor-pointer flex-col items-center justify-center whitespace-nowrap rounded-[8px] border-[3px] border-neutral-off-white px-4 transition-colors duration-200 disabled:cursor-not-allowed aria-checked:border-yellow-dark aria-checked:bg-yellow-extra-light aria-disabled:cursor-not-allowed aria-disabled:border-yellow-dark aria-disabled:bg-yellow-extra-light aria-disabled:opacity-50',
        className
      )}
    >
      <span className="body-m text-neutral-black">
        {label}
        {disabled && '*'}
      </span>
      {checkedState && (
        <div className="flex items-center space-x-1">
          <Checkbox
            id={`${id}-optional`}
            className="h-3.5 w-3.5 rounded-[2px] p-[1.5px]"
            checked={checked}
            onClick={(e) => e.stopPropagation()}
            onCheckedChange={onCheckedChange}
          />
          <label
            htmlFor={`${id}-optional`}
            onClick={(e) => e.stopPropagation()}
            className="select-none text-xs font-light text-neutral-medium-gray peer-data-[state=checked]:text-neutral-black"
          >
            Set as an optional field
          </label>
        </div>
      )}
    </div>
  );
});

SelectableCard.displayName = 'SelectableCard';

export { SelectableCard };
