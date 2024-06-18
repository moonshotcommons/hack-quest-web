import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { PlusIcon } from '@/components/ui/icons/plus';
import { cn } from '@/helper/utils';

const buttonVariants = cva('w-full relative group rounded-[0.5rem] outline-none', {
  variants: {
    variant: {
      primary: 'bg-neutral-off-white',
      outline: 'bg-neutral-white'
    },
    size: {
      large: 'h-20',
      small: 'h-[4.625rem]'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'small'
  }
});

interface AddFieldButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  iconOnly?: boolean;
}

export const AddFieldButton = React.forwardRef<HTMLButtonElement, AddFieldButtonProps>(
  ({ variant = 'primary', size = 'small', iconOnly = false, disabled = false, children, ...props }, ref) => {
    return (
      <button ref={ref} className={buttonVariants({ variant, size })} disabled={disabled} type="button" {...props}>
        <span
          className={cn('absolute inset-1 rounded-[0.5rem] border border-dashed border-neutral-light-gray', {
            'inset-2': size === 'small',
            'inset-0': variant === 'outline'
          })}
        ></span>
        <span className="flex items-center justify-center gap-1">
          <PlusIcon
            className={cn('h-6 w-6 text-neutral-medium-gray', {
              'h-8 w-8': size === 'large' || iconOnly
            })}
          />
          {!iconOnly && (
            <span
              className={cn('text-sm text-neutral-medium-gray', {
                'text-lg': size === 'large'
              })}
            >
              {children}
            </span>
          )}
        </span>
      </button>
    );
  }
);

AddFieldButton.displayName = 'AddFieldButton';
