import { cn } from '@/helper/utils';
import * as React from 'react';
interface CircularProgressProps extends Omit<React.HTMLProps<HTMLDivElement>, 'color'> {
  size?: number;
  max?: number;
  min?: number;
  thickness?: number;
  value?: number;
  children?: React.ReactNode;
  trackColor?: string;
  color?: string;
}

const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  (
    {
      size = 64,
      max = 100,
      min = 0,
      thickness = 8,
      value = 0,
      trackColor = 'var(--neutral-light-gray)',
      color = 'var(--yellow-primary)',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const rootSize = size + thickness;
    const radius = rootSize / 2 - thickness / 2;
    const strokeDasharray = 2 * Math.PI * radius;
    const strokeDashoffset = strokeDasharray - (strokeDasharray * value) / (max - min);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn('relative inline-flex shrink-0 items-center justify-center align-middle', className)}
        {...props}
        style={{
          width: rootSize,
          height: rootSize,
          ...style
        }}
      >
        <svg className="absolute left-0 top-0" width="inherit" height="inherit">
          <circle stroke={trackColor} strokeWidth={thickness} fill="transparent" cx="50%" cy="50%" r={radius} />
          <circle
            stroke={color}
            strokeWidth={thickness}
            fill="transparent"
            cx="50%"
            cy="50%"
            r={radius}
            strokeLinecap="round"
            strokeDashoffset={strokeDashoffset}
            strokeDasharray={strokeDasharray}
            className="origin-center -rotate-90"
          />
        </svg>
        {children}
      </div>
    );
  }
);

CircularProgress.displayName = 'CircularProgress';

export { CircularProgress };
