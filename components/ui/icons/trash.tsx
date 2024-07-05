import * as React from 'react';
import { cn } from '@/helper/utils';

export function TrashIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-6 w-6', className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 2H5C3.34315 2 2 3.34315 2 5V7C2 7.55228 2.44772 8 3 8H4V19C4 20.6569 5.34315 22 7 22H17C18.6569 22 20 20.6569 20 19V8H21C21.5523 8 22 7.55228 22 7V5C22 3.34315 20.6569 2 19 2ZM18 19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V8H18V19ZM4 6H20V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V6ZM8 17V11C8 10.4477 8.44772 10 9 10C9.55228 10 10 10.4477 10 11V17C10 17.5523 9.55228 18 9 18C8.44772 18 8 17.5523 8 17ZM14 11V17C14 17.5523 14.4477 18 15 18C15.5523 18 16 17.5523 16 17V11C16 10.4477 15.5523 10 15 10C14.4477 10 14 10.4477 14 11Z"
        fill="currentColor"
      />
    </svg>
  );
}
