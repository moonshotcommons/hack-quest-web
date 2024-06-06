'use client';

import Image from 'next/image';
import moment from 'moment';
import { ChevronRightIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Idea } from '@/service/webApi/ideas/types';
import { UpvoteButton } from './upvote-button';
import { useUpvoteIdea } from '../submit/store';

export function IdeaDetailCard(props: Idea) {
  const { upvoteIdea, isPending } = useUpvoteIdea(props);
  return (
    <div className="flex flex-col gap-5 sm:w-[32rem] sm:self-start sm:rounded-2xl sm:border sm:border-neutral-light-gray sm:bg-neutral-white sm:p-6">
      <h2 className="font-next-book-bold text-lg font-bold text-neutral-off-black sm:text-[1.75rem]">{props.name}</h2>
      <div className="flex w-full flex-col gap-2">
        <div className="sm:body-m body-s grid grid-cols-2">
          <span className="text-neutral-medium-gray">Idea Provided by</span>
          <div className="flex items-center gap-2">
            <span className="relative h-6 w-6 overflow-hidden rounded-full sm:h-7 sm:w-7">
              <Image src={props.user.avatar} alt="avatar" fill className="rounded-full" />
            </span>
            <div className="relative flex items-center gap-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-yellow-dark">
              <span className="text-neutral-off-black">{props.user.nickname}</span>
              <ChevronRightIcon size={20} />
            </div>
          </div>
        </div>
        <div className="sm:body-m body-s grid grid-cols-2">
          <span className="text-neutral-medium-gray">Ecosystem</span>
          <span className="text-neutral-off-black">{props.ecosystem.name?.split(' ')[0]}</span>
        </div>
        <div className="sm:body-m body-s grid grid-cols-2">
          <span className="text-neutral-medium-gray">Track</span>
          <span className="text-neutral-off-black">{props.track}</span>
        </div>
        <div className="sm:body-m body-s grid grid-cols-2">
          <span className="text-neutral-medium-gray">Creation Time</span>
          <span className="text-neutral-off-black">{moment(props.createdAt).format('ll')}</span>
        </div>
      </div>
      <Separator />
      <div className="flex w-full flex-col gap-2">
        <div className="sm:body-m body-s grid grid-cols-2">
          <span className="text-neutral-medium-gray">Open to Team up</span>
          <span className="text-neutral-off-black">{props.teamUp ? 'Yes' : 'No'}</span>
        </div>
        <div className="sm:body-m body-s grid grid-cols-2">
          <span className="capitalize text-neutral-medium-gray">{props.contractKey}</span>
          <span className="text-neutral-off-black">{props.contractValue}</span>
        </div>
      </div>
      <Separator />
      <UpvoteButton
        onClick={upvoteIdea}
        disabled={isPending}
        size="large"
        voteCount={props.vote}
        active={props.isLike}
      />
    </div>
  );
}
