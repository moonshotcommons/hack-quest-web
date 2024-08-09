import * as React from 'react';
import { cn } from '@/helper/utils';

export function ArrowIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-6 w-6', className)}
      {...props}
    >
      <path
        d="M29.3337 15.9997C29.3337 16.7361 28.7367 17.333 28.0003 17.333H6.89366L13.0137 24.4664C13.4923 25.026 13.4266 25.8677 12.867 26.3464C12.3073 26.825 11.4656 26.7594 10.987 26.1997L2.98699 16.8664C2.93923 16.7999 2.89898 16.7284 2.86699 16.653C2.82686 16.6029 2.79117 16.5494 2.76033 16.493C2.70255 16.3348 2.67103 16.1681 2.66699 15.9997C2.67103 15.8313 2.70255 15.6646 2.76033 15.5064C2.79117 15.45 2.82686 15.3965 2.86699 15.3464C2.89898 15.271 2.93923 15.1995 2.98699 15.133L10.987 5.7997C11.4656 5.24006 12.3073 5.17439 12.867 5.65304C13.4266 6.13169 13.4923 6.97339 13.0137 7.53304L6.89366 14.6664H28.0003C28.7367 14.6664 29.3337 15.2633 29.3337 15.9997Z"
        fill="currentColor"
      />
    </svg>
  );
}