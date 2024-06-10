'use client';

import moment from 'moment';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Idea } from '@/service/webApi/ideas/types';
import { UpvoteButton } from './upvote-button';
import { useUpvoteIdea } from '../submit/store';

export function IdeaCard(props: Idea) {
  const { upvoteIdea, isPending } = useUpvoteIdea(props);

  return (
    <Link href={`/idea-bank/${props.id}`}>
      <div className="sm:card-hover flex h-[230px] flex-col justify-between rounded-2xl bg-neutral-white px-4 py-3 shadow-idea-card sm:h-[249px] sm:px-6 sm:py-5">
        <div className="flex flex-wrap items-center gap-2">
          {props.teamUp && <Badge variant="primary">Team Wanted</Badge>}
          <Badge>{props.ecosystem?.name ? props.ecosystem?.name?.split(' ')[0] : 'All'}</Badge>
          <Badge>{props.track}</Badge>
        </div>
        <h2 className="body-s sm:headline-h4 mt-4 line-clamp-1 font-bold text-neutral-off-black">{props.name}</h2>
        <p className="body-xs sm:body-s mt-3 line-clamp-2 text-neutral-rich-gray">{props.solution}</p>
        <UpvoteButton
          disabled={isPending}
          className="mt-auto"
          voteCount={props.vote}
          active={props.isLike}
          onClick={upvoteIdea}
        />
        <div className="mt-4 flex items-center gap-4 text-xs text-neutral-rich-gray">
          <h6>
            By <span className="underline">{props.user?.nickname}</span>
          </h6>
          <time dateTime="2024-06-22">{moment(props.createdAt).format('ll')}</time>
        </div>
      </div>
    </Link>
  );
}
