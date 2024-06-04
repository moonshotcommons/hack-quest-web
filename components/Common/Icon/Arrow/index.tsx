import * as React from 'react';
import { cn } from '@/helper/utils';

export function FillArrowIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-6 w-6', className)}
      {...props}
    >
      <path
        d="M15.6562 7.26795C16.9896 8.03775 16.9896 9.96225 15.6562 10.7321L3.65625 17.6603C2.32292 18.4301 0.656249 17.4678 0.656249 15.9282L0.65625 2.0718C0.65625 0.532196 2.32292 -0.430055 3.65625 0.339746L15.6562 7.26795Z"
        fill="currentColor"
      />
    </svg>
  );
}
