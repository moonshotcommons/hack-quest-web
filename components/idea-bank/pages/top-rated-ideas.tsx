'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { Idea } from '@/service/webApi/ideas/types';
import { ChangeState, ScrollContainer, ScrollControl } from '@/components/Common/ScrollContainer';
import { useLang } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { cn, toDoubleArray } from '@/helper/utils';
import { IdeaCard } from './idea-card';
import { Empty } from './empty';

export function WebTopRatedIdeas({ ideas }: { ideas: Idea[] }) {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.IDEA_BANK);
  const groupIdeas = toDoubleArray(ideas, 4);
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
        <h1 className="headline-h3 text-neutral-black">{t('top_rated_ideas')}</h1>
        {groupIdeas?.length > 1 && (
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
      {groupIdeas?.length === 0 && <Empty />}
      {groupIdeas?.length > 0 && (
        <ScrollContainer onChange={setChangeState} className="w-full py-8">
          <div className="flex">
            {groupIdeas?.map((group, index) => (
              <div key={index} className="flex w-[1360px] gap-5 p-0.5">
                {group?.map((idea) => (
                  <div key={idea.id} className="w-[calc((100%-60px)/4)]">
                    <IdeaCard {...idea} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </ScrollContainer>
      )}
      {groupIdeas?.length > 1 && (
        <div className="flex items-center justify-center gap-[10px]">
          {groupIdeas?.map((_, index) => (
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

export function MobileTopRatedIdeas({ ideas }: { ideas: Idea[] }) {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.IDEA_BANK);
  const [visibleCount, setVisibleCount] = React.useState(2);

  function handleViewMore() {
    setVisibleCount((prev) => prev + 2);
  }

  return (
    <div className="px-5 pb-10 pt-5 sm:hidden">
      <h1 className="headline-h2-mob text-neutral-black">{t('top_rated_ideas')}</h1>
      {ideas?.length === 0 && <Empty />}
      {ideas?.length > 0 && (
        <div className="grid grid-cols-1 gap-5 py-5">
          {ideas?.slice(0, visibleCount).map((idea) => <IdeaCard key={idea.id} {...idea} />)}
        </div>
      )}
      {visibleCount < ideas?.length && (
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
