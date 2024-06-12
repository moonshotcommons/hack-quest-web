import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/helper/utils';
import { Flashing } from './loader';

const buttonVariants = cva(
  'inline-flex items-center justify-center p-4 text-neutral-black disabled:text-neutral-medium-gray whitespace-nowrap rounded-full font-medium transition-all duration-300 focus-visible:outline-none disabled:cursor-not-allowed uppercase enabled:hover:scale-105',
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
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, asChild = false, isLoading = false, disabled, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';
    return (
      <Component
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading ? <Flashing rootClassName="gap-1.5" /> : children}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
