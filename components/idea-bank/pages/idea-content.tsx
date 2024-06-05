import * as React from 'react';
import { Idea } from '@/service/webApi/ideas/types';

function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <span className="h-[26px] w-[5px] rounded-full bg-yellow-dark sm:h-[34px]" />
      <h1 className="headline-h2-mob sm:headline-h3 text-neutral-black">{children}</h1>
    </div>
  );
}

function Description({ children }: { children: React.ReactNode }) {
  return <p className="sm:body-l body-s text-neutral-off-black">{children}</p>;
}

export function IdeaContent(props: Idea) {
  const { solve, solution, inspiration, otherInfo } = props;
  return (
    <div className="mt-[60px] flex flex-1 flex-col gap-[60px] sm:mt-0">
      <div className="flex flex-col gap-4 sm:gap-8">
        <Title>Problem To Solve</Title>
        <Description>{solve}</Description>
      </div>
      <div className="flex flex-col gap-4 sm:gap-8">
        <Title>Problem Solution</Title>
        <Description>{solution}</Description>
      </div>
      <div className="flex flex-col gap-4 sm:gap-8">
        <Title>Inspiration</Title>
        <Description>{inspiration}</Description>
      </div>
      {otherInfo && (
        <div className="flex flex-col gap-4 sm:gap-8">
          <Title>Other Information</Title>
          <Description>{otherInfo}</Description>
        </div>
      )}
    </div>
  );
}
