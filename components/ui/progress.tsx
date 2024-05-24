'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/helper/utils';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, max = 100, children, ...props }, ref) => (
  <div className="flex w-full items-center gap-2">
    <ProgressPrimitive.Root
      ref={ref}
      value={value}
      max={max}
      className={cn('relative h-1.5 w-full overflow-hidden rounded-full bg-neutral-off-white', className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 rounded-full bg-yellow-dark opacity-60 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
    {children}
  </div>
));

Progress.displayName = ProgressPrimitive.Root.displayName;

const ProgressLabel = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return <span className={cn('text-xs font-light text-neutral-rich-gray', className)} ref={ref} {...props} />;
  }
);

ProgressLabel.displayName = 'ProgressLabel';

export { Progress, ProgressLabel };
