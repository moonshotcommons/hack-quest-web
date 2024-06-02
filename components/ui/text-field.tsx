import * as React from 'react';
import { cn } from '@/helper/utils';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'sm:body-m body-s flex h-[2.875rem] w-full rounded-[0.5rem] border border-neutral-light-gray bg-transparent p-4 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-medium-gray focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-neutral-light-gray sm:h-[3.125rem]',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

TextField.displayName = 'TextField';

export { TextField };
