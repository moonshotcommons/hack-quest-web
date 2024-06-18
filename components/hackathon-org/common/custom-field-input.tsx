import * as React from 'react';
import { cn } from '@/helper/utils';

export interface CustomFieldInputProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange'> {
  index?: number;
  onChange?: (id: number, value: string) => void;
}

export const CustomFieldInput = React.forwardRef<HTMLInputElement, CustomFieldInputProps>(
  ({ className, value, onChange, index = 1, ...props }, ref) => {
    return (
      <div className="flex items-center gap-5 rounded-[10px] border border-neutral-light-gray px-6 py-5">
        <span className="body-m inline-flex h-8 w-8 items-center justify-center rounded-[4px] border-2 border-neutral-light-gray text-neutral-off-black">
          {index}
        </span>
        <input
          value={value}
          onChange={(e) => onChange?.(index, e.target.value)}
          type="number"
          className={cn('flex-1 outline-none', className)}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

CustomFieldInput.displayName = 'CustomFieldInput';
