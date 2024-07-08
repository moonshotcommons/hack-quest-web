import * as React from 'react';
import { cn } from '@/helper/utils';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'flex h-[2.875rem] w-full rounded-[0.5rem] border border-neutral-light-gray bg-transparent p-4 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-medium-gray read-only:bg-neutral-off-white focus:border-neutral-medium-gray focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-neutral-light-gray sm:h-[3.125rem] sm:text-base',
        className
      )}
      {...props}
    />
  );
});

TextField.displayName = 'TextField';

export { TextField };
