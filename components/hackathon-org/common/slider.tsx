'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/helper/utils';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    value={value}
    className={cn('relative flex w-full touch-none select-none items-center', className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2.5 w-full grow overflow-hidden rounded-full bg-neutral-off-white">
      <SliderPrimitive.Range className="absolute h-full bg-yellow-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="flex h-8 cursor-grabbing gap-px rounded-[4px] bg-neutral-white shadow-popper transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
      <span className="flex h-full w-10 flex-1 items-center rounded-l-[4px] bg-yellow-dark">
        <ChevronLeftIcon size={16} className="text-neutral-medium-gray" />
        <span className="text-xs text-neutral-rich-gray">{((value?.[0] || 0) / 100).toFixed(1)}</span>
      </span>
      <span className="flex h-full w-10 flex-1 items-center justify-end rounded-l-[4px] bg-neutral-off-white p-px">
        <span className="text-xs text-neutral-rich-gray">{(1 - (value?.[0] || 0) / 100).toFixed(1)}</span>
        <ChevronRightIcon size={16} className="text-neutral-medium-gray" />
      </span>
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
