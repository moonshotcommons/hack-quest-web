import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/helper/utils';

type RadioCardsElement = React.ElementRef<typeof RadioGroupPrimitive.Root>;
interface RadioCardsProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {}

const RadioCards = React.forwardRef<RadioCardsElement, RadioCardsProps>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-4 sm:grid-cols-2', className)} {...props} ref={ref} />;
});

RadioCards.displayName = RadioGroupPrimitive.Root.displayName;

type RadioCardsItemElement = React.ElementRef<typeof RadioGroupPrimitive.Item>;
interface RadioCardsItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {}

const RadioCardsItem = React.forwardRef<RadioCardsItemElement, RadioCardsItemProps>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      className={cn('w-full rounded-2xl border border-neutral-light-gray p-4 outline-none', className)}
      {...props}
      ref={ref}
    />
  );
});

RadioCardsItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioCards, RadioCardsItem };
