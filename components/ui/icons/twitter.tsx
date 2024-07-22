import * as React from 'react';
import { cn } from '@/helper/utils';

export function TwitterIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={cn('h-6 w-6', className)}
      {...props}
    >
      <path
        d="M18.3263 1.90234H21.6998L14.3297 10.3258L23 21.7883H16.2112L10.894 14.8364L4.80995 21.7883H1.43443L9.31743 12.7784L1 1.90234H7.96111L12.7674 8.25668L18.3263 1.90234ZM17.1423 19.7691H19.0116L6.94539 3.81548H4.93946L17.1423 19.7691Z"
        fill="black"
      />
    </svg>
  );
}
