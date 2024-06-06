'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/helper/utils';

const checkboxVariants = cva(
  'peer shrink-0 focus-visible:outline-none border disabled:cursor-not-allowed disabled:opacity-50 border-neutral-medium-gray p-[0.1875rem] rounded-[0.1875rem] group data-[state=checked]:border-neutral-black',
  {
    variants: {
      size: {
        small: 'h-5 w-5',
        large: 'h-6 w-6'
      }
    },
    defaultVariants: {
      size: 'small'
    }
  }
);

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & VariantProps<typeof checkboxVariants>
>(({ className, size, ...props }, ref) => (
  <CheckboxPrimitive.Root ref={ref} data-size={size} className={cn(checkboxVariants({ size }), className)} {...props}>
    <CheckboxPrimitive.Indicator className="flex h-full w-full items-center justify-center rounded-[0.125rem] bg-transparent data-[state=checked]:bg-neutral-black" />
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
