import { cn } from '@/helper/utils';
import * as React from 'react';
import Image from 'next/image';

// data => { user: 50, advocate: 100, junior: 200 }

export function VotingRole({
  role,
  votes,
  size = 'small'
}: {
  role: string;
  votes: { [key in string]: number };
  size?: 'small' | 'large';
}) {
  return (
    <div className="w-full">
      <h1
        className={cn('text-lg font-bold text-neutral-black', {
          'text-2xl': size === 'large'
        })}
      >
        Your Voting Role
      </h1>
      <div className={cn('grid grid-cols-3 gap-3 py-4', { 'py-2': size === 'large' })}>
        {Object.entries(votes || {}).map(([key, value]) => (
          <div
            key={key}
            className={cn(
              'flex flex-col items-center justify-center rounded-[0.5rem] border border-transparent bg-neutral-light-gray px-2 py-1.5 opacity-30',
              {
                'border-neutral-medium-gray bg-neutral-white opacity-100': key === role,
                'py-3': size === 'large'
              }
            )}
          >
            <div
              className={cn('flex flex-col items-center gap-y-1', {
                'flex-row gap-x-2': size === 'large'
              })}
            >
              <div className="h-8 w-8">
                <Image
                  priority
                  src={`/images/hackathon/voting_role_${key}.svg`}
                  width={32}
                  height={32}
                  alt={`Voting role ${key}`}
                />
              </div>
              <h3 className={cn('text-sm capitalize text-neutral-black', { 'text-lg': size === 'large' })}>{key}</h3>
            </div>
            <span className={cn('text-xs font-light text-neutral-rich-gray', { 'mt-2 text-sm': size === 'large' })}>
              {value} Votes
            </span>
          </div>
        ))}
      </div>
      <p className="body-xs text-neutral-medium-gray">
        *The number of votes you get everyday is determined by your current role, current HackQuest level, and your
        registration time.
      </p>
    </div>
  );
}
