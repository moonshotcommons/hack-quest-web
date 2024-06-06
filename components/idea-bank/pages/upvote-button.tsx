'use client';

import * as React from 'react';
import { ChevronUpIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/helper/utils';

export function UpvoteButton({
  voteCount,
  active,
  size = 'small',
  disabled = false,
  onClick,
  className
}: {
  voteCount: number;
  active: boolean;
  size?: 'small' | 'large';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}) {
  const isDisabled = disabled || active;
  return (
    <button
      data-active={active}
      data-size={size}
      aria-disabled={isDisabled}
      disabled={isDisabled}
      data-prevent-nprogress={true}
      onClick={onClick}
      className={cn(
        'group inline-flex h-10 items-center justify-center rounded-[0.5rem] border border-neutral-medium-gray px-4 py-2 leading-[160%] text-neutral-off-black data-[size=large]:h-[3.125rem] data-[active=true]:border-yellow-dark data-[active=true]:bg-yellow-extra-light data-[size=large]:py-3 sm:data-[size=large]:h-16 sm:data-[size=large]:py-4',
        className
      )}
    >
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-medium-gray p-0.5 group-data-[size=large]:h-6 group-data-[size=large]:w-6 group-data-[active=true]:bg-yellow-dark sm:group-data-[size=large]:h-8 sm:group-data-[size=large]:w-8">
        <ChevronUpIcon className="h-full w-full text-neutral-white" />
      </span>
      <span className="body-xs sm:body-s sm:group-data-[size=large]:body-l group-data-[size=large]:body-m ml-2">
        UPVOTE
      </span>
      <Separator orientation="vertical" className="mx-8 h-full bg-neutral-rich-gray" />
      <span className="body-xs sm:body-s sm:group-data-[size=large]:body-l group-data-[size=large]:body-m">
        {voteCount}
      </span>
    </button>
  );
}
