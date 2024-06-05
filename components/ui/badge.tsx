import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/helper/utils';

const badgeVariants = cva(
  'inline-flex whitespace-nowrap items-center h-6 rounded-full border px-3 py-1 text-xs font-light',
  {
    variants: {
      variant: {
        outline: 'border-neutral-rich-gray bg-transparent text-neutral-rich-gray',
        primary: 'bg-yellow-primary border-transparent text-neutral-off-black'
      }
    },
    defaultVariants: {
      variant: 'outline'
    }
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
