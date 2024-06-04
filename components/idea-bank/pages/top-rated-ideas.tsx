'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { ChangeState, ScrollContainer, ScrollControl } from '@/components/Common/ScrollContainer';
import { cn, toDoubleArray } from '@/helper/utils';
import { IdeaCard } from './idea-card';

const data = [
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    upvotes: 10,
    ecosystem: 'Solana',
    track: 'DeFi',
    isTeamWanted: true,
    creator: 'Harry Porter',
    creationDate: 'June 22, 2024'
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor sit amet',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    upvotes: 10,
    ecosystem: 'Solana',
    track: 'DeFi',
    isTeamWanted: false,
    creator: 'Harry Porter',
    creationDate: 'June 22, 2024'
  },
  {
    id: 3,
    title: 'Lorem ipsum dolor sit amet',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    upvotes: 10,
    ecosystem: 'Solana',
    track: 'DeFi',
    isTeamWanted: true,
    creator: 'Harry Porter',
    creationDate: 'June 22, 2024'
  },
  {
    id: 4,
    title: 'Lorem ipsum dolor sit amet',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    upvotes: 10,
    ecosystem: 'Solana',
    track: 'DeFi',
    isTeamWanted: true,
    creator: 'Harry Porter',
    creationDate: 'June 22, 2024'
  },
  {
    id: 5,
    title: 'Lorem ipsum dolor sit amet',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    upvotes: 100,
    ecosystem: 'Meta',
    track: 'DeFi',
    isTeamWanted: false,
    creator: 'Harry Porter',
    creationDate: 'June 22, 2024'
  }
];

export function WebTopRatedIdeas() {
  const groupIdeas = toDoubleArray(data, 4);
  const [slide, setSlide] = React.useState(0);
  const [changeState, setChangeState] = React.useState<ChangeState>();

  function onPrevious() {
    if (slide === 0) return;
    setSlide((prev) => prev - 1);
  }

  function onNext() {
    if (slide === groupIdeas.length - 1) return;
    setSlide((prev) => prev + 1);
  }

  return (
    <div className="hidden pb-[3.75rem] pt-20 sm:block">
      <div className="flex items-center justify-between">
        <h1 className="headline-h3 text-neutral-black">Top Rated Ideas</h1>
        {groupIdeas.length > 1 && (
          <ScrollControl
            changeState={changeState}
            showSlider={false}
            controlWrapSize={36}
            controlIconSize={20}
            onLeftClick={onPrevious}
            onRightClick={onNext}
          />
        )}
      </div>
      <ScrollContainer onChange={setChangeState} className="w-full py-8">
        <div className="flex">
          {groupIdeas.map((group, index) => (
            <div key={index} className="flex w-[1360px] gap-5 p-0.5">
              {group.map((idea) => (
                <div key={idea.id} className="w-[calc((100%-60px)/4)]">
                  <IdeaCard />
                </div>
              ))}
            </div>
          ))}
        </div>
      </ScrollContainer>
      {groupIdeas.length > 1 && (
        <div className="flex items-center justify-center gap-[10px]">
          {groupIdeas.map((_, index) => (
            <div
              key={index}
              className={cn('h-1 w-8 rounded-sm bg-neutral-light-gray', {
                'bg-yellow-dark': index === slide
              })}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function MobileTopRatedIdeas() {
  const [visibleCount, setVisibleCount] = React.useState(2);

  function handleViewMore() {
    setVisibleCount((prev) => prev + 2);
  }

  return (
    <div className="px-5 pb-10 pt-5 sm:hidden">
      <h1 className="headline-h2-mob text-neutral-black">Top Rated Ideas</h1>
      <div className="grid grid-cols-1 gap-5 py-5">
        {data.slice(0, visibleCount).map((idea) => (
          <IdeaCard key={idea.id} />
        ))}
      </div>
      {visibleCount < data.length && (
        <button
          onClick={handleViewMore}
          className="inline-flex items-center gap-1.5 font-next-book text-sm leading-[125%] text-neutral-off-black"
        >
          <span>View more</span>
          <ChevronDownIcon size={20} />
        </button>
      )}
    </div>
  );
}
