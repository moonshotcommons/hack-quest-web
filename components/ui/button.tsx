import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/helper/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center p-4 text-neutral-black disabled:text-neutral-medium-gray whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-yellow-primary hover:bg-yellow-hover disabled:bg-neutral-light-gray',
        outline:
          'bg-transparent border border-neutral-black hover:bg-neutral-off-white hover:border-neutral-medium-gray disabled:border-neutral-medium-gray'
      },
      size: {
        large: 'h-[3.75rem] text-lg',
        medium: 'h-12 text-sm',
        small: 'h-[2.125rem] text-xs'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  // isLoding?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';
    return <Component className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
