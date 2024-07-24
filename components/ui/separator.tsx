'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@/helper/utils';

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
    variant?: 'solid' | 'dashed';
  }
>(({ className, orientation = 'horizontal', variant = 'solid', decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'shrink-0 border-neutral-light-gray',
      variant === 'dashed' ? 'border-dashed' : 'border-solid',
      orientation === 'horizontal' ? 'h-px w-full border-t' : 'h-full w-px border-l',
      className
    )}
    {...props}
  />
));

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
