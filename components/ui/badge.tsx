import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/helper/utils';

const badgeVariants = cva('inline-flex whitespace-nowrap items-center rounded-full border font-light', {
  variants: {
    variant: {
      outline: 'border-neutral-rich-gray bg-transparent text-neutral-rich-gray',
      primary: 'bg-yellow-primary border-transparent text-neutral-off-black'
    },
    size: {
      small: 'h-6 px-3 py-1 text-xs',
      large: 'h-7 px-3.5 py-1.5 text-sm'
    }
  },
  defaultVariants: {
    variant: 'outline',
    size: 'small'
  }
});

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge, badgeVariants };
