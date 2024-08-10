import * as React from 'react';
import * as CheckboxGroupPrimitive from '@/components/ui/checkbox-group.primitive';
import { cn } from '@/helper/utils';

const CheckboxTag = React.forwardRef<
  React.ElementRef<typeof CheckboxGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <CheckboxGroupPrimitive.Root className={cn('flex flex-wrap items-center gap-2', className)} {...props} ref={ref} />
  );
});

CheckboxTag.displayName = CheckboxGroupPrimitive.Root.displayName;

const CheckboxTagItem = React.forwardRef<
  React.ElementRef<typeof CheckboxGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CheckboxGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  if (children) {
    return (
      <CheckboxGroupPrimitive.Item
        ref={ref}
        className={cn(
          'self-start rounded-full border border-neutral-rich-gray px-3.5 py-1.5 text-sm font-light text-neutral-rich-gray outline-none transition-colors duration-300 aria-checked:bg-neutral-rich-gray aria-checked:text-neutral-white',
          className
        )}
        {...props}
      >
        <CheckboxGroupPrimitive.Indicator className="hidden" />
        {children && <span>{children}</span>}
      </CheckboxGroupPrimitive.Item>
    );
  }

  return (
    <CheckboxGroupPrimitive.Item
      ref={ref}
      className={cn(
        'group peer h-6 w-6 shrink-0 rounded-[0.1875rem] border border-neutral-medium-gray p-[0.1875rem] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-neutral-black',
        className
      )}
      {...props}
    >
      <CheckboxGroupPrimitive.Indicator className="flex h-full w-full items-center justify-center rounded-[0.125rem] bg-transparent data-[state=checked]:bg-neutral-black" />
    </CheckboxGroupPrimitive.Item>
  );
});

CheckboxTagItem.displayName = CheckboxGroupPrimitive.Item.displayName;

export { CheckboxTag, CheckboxTagItem };
