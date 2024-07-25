import { cn } from '@/helper/utils';
import { Check } from 'lucide-react';
import React from 'react';

interface VoteTickIconProp {
  type?: 'notVoted' | 'other' | 'self';
  className?: string;
  size?: number;
}

const VoteTickIcon: React.FC<VoteTickIconProp> = ({ type = 'notVoted', className, size = 16 }) => {
  switch (type) {
    case 'other':
      return (
        <div
          className={cn(
            'flex h-[1.5rem] w-[1.5rem] items-center justify-center rounded-[.25rem] border border-status-success-dark bg-status-success-light  text-status-success-dark',
            className
          )}
        >
          <Check size={size} />
        </div>
      );
    case 'self':
      return (
        <div
          className={cn(
            'flex h-[1.5rem] w-[1.5rem] items-center justify-center rounded-[.25rem] border border-yellow-dark bg-yellow-extra-light  text-yellow-dark',
            className
          )}
        >
          <Check size={size} />
        </div>
      );
    default:
      return (
        <div className={cn('h-[1.5rem] w-[1.5rem] rounded-[.25rem] border border-neutral-light-gray', className)}></div>
      );
  }
};

export default VoteTickIcon;
