import * as React from 'react';
import { cn } from '@/helper/utils';

export const DatePicker = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ type = 'datetime-local', className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'h-10 w-full rounded-[0.5rem] border border-neutral-light-gray px-3 outline-none aria-[invalid=true]:border-status-error-dark',
          className
        )}
        {...props}
      />
    );
  }
);

DatePicker.displayName = 'DatePicker';
