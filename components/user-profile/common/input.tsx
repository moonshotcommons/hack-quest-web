import * as React from 'react';
import { cn } from '@/helper/utils';

type InputElement = React.ElementRef<'input'>;
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<InputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'flex h-12 w-full rounded-[0.5rem] p-3 text-sm text-neutral-off-black outline-none ring-1 ring-inset ring-neutral-light-gray transition-all duration-300 placeholder:text-neutral-medium-gray read-only:bg-neutral-off-white focus:shadow-field-valid focus:ring-neutral-medium-gray aria-[invalid=true]:ring-status-error-dark aria-[invalid=true]:focus:shadow-field-invalid sm:text-base',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
