'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/helper/utils';
import { useLang } from '../Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

const roles = [
  { name: 'user', key: 'USER', defaultVotes: 0 },
  { name: 'advocate', key: 'ADVOCATE', defaultVotes: 0 },
  { name: 'judge', key: 'JUDGE', defaultVotes: 0 }
];

export function VotingRole({
  votes,
  size = 'small'
}: {
  votes: { [key in string]: number };
  size?: 'small' | 'large';
}) {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const highlightedRole = roles.find((role) => votes[role.key] !== undefined);
  const highlightedVotes = highlightedRole ? votes[highlightedRole.key] : 0;
  return (
    <div className="w-full">
      <h1
        className={cn('text-lg font-bold text-neutral-black', {
          'text-2xl': size === 'large'
        })}
      >
        {t('dashboard.yourVotingRole')}
      </h1>
      <div className={cn('grid grid-cols-3 gap-3 py-4', { 'py-2': size === 'large' })}>
        {roles.map((role) => (
          <div
            key={role.key}
            className={cn(
              'flex flex-col items-center justify-center rounded-[0.5rem] border border-transparent bg-neutral-light-gray px-2 py-1.5 opacity-30',
              {
                'border-neutral-medium-gray bg-neutral-white opacity-100':
                  highlightedRole && highlightedRole.key === role.key,
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
                  src={`/images/hackathon/voting_role_${role.name}.svg`}
                  width={32}
                  height={32}
                  alt={`Voting role ${role.name}`}
                />
              </div>
              <h3 className={cn('text-sm capitalize text-neutral-black', { 'text-lg': size === 'large' })}>
                {role.name}
              </h3>
            </div>
            <span className={cn('text-xs font-light text-neutral-rich-gray', { 'mt-2 text-sm': size === 'large' })}>
              {highlightedRole && highlightedRole.key === role.key ? highlightedVotes : role.defaultVotes} Votes
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
