import { cn } from '@/helper/utils';
import * as React from 'react';

type SpinnerElement = React.ElementRef<'span'>;
type SpinnerProps = React.ComponentPropsWithoutRef<'span'> & {
  size?: number;
  loading?: boolean;
};

const Spinner = React.forwardRef<SpinnerElement, SpinnerProps>(
  ({ className, size = 20, loading = true, ...props }, ref) => {
    return (
      <span
        ref={ref}
        aria-busy={loading}
        className={cn('text-yellow-dark', className)}
        style={{
          width: size,
          height: size,
          animation: '1.4s linear 0s infinite normal none running loading'
        }}
        {...props}
      >
        <svg viewBox="22 22 44 44">
          <circle
            cx="44"
            cy="44"
            r="20.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.6"
            style={{
              strokeDasharray: '80px, 200px',
              strokeDashoffset: '0px',
              animation: '1.4s ease-in-out 0s infinite normal none running dasharray'
            }}
          />
        </svg>
      </span>
    );
  }
);

Spinner.displayName = 'Spinner';

export { Spinner };
