import * as React from 'react';
import { cn } from '@/helper/utils';

export function ChevronIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      className={cn('h-6 w-6', className)}
      {...props}
    >
      <path
        d="M11.2076 7.52937C11.6079 7.00936 12.3921 7.00936 12.7924 7.52937L17.6888 13.89C18.195 14.5476 17.7263 15.5 16.8964 15.5H7.10358C6.27374 15.5 5.80497 14.5476 6.31117 13.89L11.2076 7.52937Z"
        fill="currentColor"
      />
    </svg>
  );
}
