import * as React from 'react';
import { cn } from '@/helper/utils';

const DateTimeRoot = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('flex flex-col gap-1 self-start', className)} {...props} />;
  }
);

DateTimeRoot.displayName = 'DateTimeRoot';

const DateTimeLabel = React.forwardRef<HTMLLabelElement, React.ComponentPropsWithoutRef<'label'>>(
  ({ className, ...props }, ref) => {
    return <label ref={ref} className={cn('body-m text-neutral-rich-gray', className)} {...props} />;
  }
);

DateTimeLabel.displayName = 'DateTimeLabel';

const DateTimeInput = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'>>(
  ({ className, placeholder, ...props }, ref) => {
    return (
      <input
        ref={ref}
        placeholder={placeholder}
        className={cn(
          'body-m max-w-[64px] rounded-[8px] p-3 text-neutral-off-black outline-none ring-1 ring-neutral-light-gray focus:ring-neutral-medium-gray',
          className
        )}
        type="number"
        {...props}
      />
    );
  }
);

DateTimeInput.displayName = 'DateTimeInput';

const DateTimeSeparator = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => {
    return (
      <span ref={ref} className={cn('h-5 w-0.5 rotate-12 rounded-full bg-neutral-off-black', className)} {...props} />
    );
  }
);

DateTimeSeparator.displayName = 'DateTimeSeparator';

const Root = DateTimeRoot;

const Label = DateTimeLabel;

const Input = DateTimeInput;

const Separator = DateTimeSeparator;

export { Root, Label, Input, Separator };
