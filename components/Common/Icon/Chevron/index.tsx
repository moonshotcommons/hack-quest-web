import * as React from 'react';
import { cn } from '@/helper/utils';

export const IconChevron = React.memo<
  React.SVGAttributes<SVGElement> & {
    direction?: 'left' | 'right' | 'up' | 'down';
  }
>(function IconChevron({ direction, className, ...props }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-4 w-4', {
        'rotate-180': direction === 'left',
        'rotate-90': direction === 'down',
        'rotate-270': direction === 'up'
      })}
      {...props}
    >
      <path
        d="M11.1671 8.44032L5.83375 14.4403C5.59058 14.7161 5.17001 14.743 4.89375 14.5003C4.61795 14.2572 4.5911 13.8366 4.83375 13.5603L9.77375 8.00032L4.83375 2.44032C4.60988 2.16238 4.64461 1.75743 4.91253 1.52166C5.18045 1.28589 5.58653 1.30293 5.83375 1.56032L11.1671 7.56032C11.3882 7.81199 11.3882 8.18865 11.1671 8.44032Z"
        fill="currentColor"
      />
    </svg>
  );
});
