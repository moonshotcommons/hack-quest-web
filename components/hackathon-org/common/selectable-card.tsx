import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useControllableState } from '@/hooks/state/use-controllable-state';
import { cn } from '@/helper/utils';
import { noop } from '@/lib/utils';
import { XIcon } from 'lucide-react';

interface SelectableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  itemId: string;
  isEditable?: boolean;
  label?: React.ReactNode;
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  optional?: boolean;
  defaultOptional?: boolean;
  onOptionalChange?: (checked: boolean) => void;
  onEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
}

const SelectableCard = React.forwardRef<HTMLDivElement, SelectableCardProps>((props, ref) => {
  const {
    itemId,
    isEditable = false,
    label,
    disabled = false,
    className,
    required,
    onCheckedChange = noop,
    onOptionalChange = noop,
    onEdit,
    onRemove
  } = props;

  const id = React.useId();
  const [checkedState = false, setCheckedState] = useControllableState(props, 'checked', onCheckedChange);
  const [optionalState = false, setOptionalState] = useControllableState(props, 'optional', onOptionalChange);

  return (
    <div
      ref={ref}
      role="checkbox"
      aria-checked={checkedState}
      aria-disabled={disabled}
      data-state={checkedState ? 'checked' : 'unchecked'}
      onClick={() => !disabled && setCheckedState(!checkedState)}
      className={cn(
        'group relative inline-flex h-[74px] cursor-pointer flex-col items-center justify-center whitespace-nowrap rounded-[8px] border-[3px] border-neutral-off-white px-3 transition-colors duration-200 disabled:cursor-not-allowed aria-checked:border-yellow-dark aria-checked:bg-yellow-extra-light aria-disabled:cursor-not-allowed aria-disabled:border-yellow-dark aria-disabled:bg-yellow-extra-light aria-disabled:opacity-50',
        className
      )}
    >
      <div className="body-m flex max-w-full items-center text-neutral-black">
        <span className="truncate">{label}</span>
        {(disabled || required) && '*'}
        {isEditable && (
          <button
            type="button"
            className="ml-2 text-sm text-neutral-medium-gray underline outline-none"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(itemId);
            }}
          >
            Edit
          </button>
        )}
      </div>
      {checkedState && !disabled && (
        <div className="flex items-center space-x-1">
          <Checkbox
            id={`${id}-optional`}
            className="h-3.5 w-3.5 rounded-[2px] p-[1.5px]"
            checked={optionalState}
            onClick={(e) => e.stopPropagation()}
            onCheckedChange={setOptionalState}
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
      {isEditable && (
        <button
          type="button"
          aria-label="Remove option"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.(itemId);
          }}
          className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-status-error opacity-0 outline-none transition-opacity group-hover:opacity-100"
        >
          <XIcon size={20} className="text-neutral-white" />
        </button>
      )}
    </div>
  );
});

SelectableCard.displayName = 'SelectableCard';

export { SelectableCard };
