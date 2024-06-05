'use client';

import Link from 'next/link';
import moment from 'moment';
import { Badge } from '@/components/ui/badge';
import { UpvoteButton } from './upvote-button';
import { Idea } from '@/service/webApi/ideas/types';
import { useMutation } from '@tanstack/react-query';
import webApi from '@/service';

export function IdeaCard({ id, name, ecosystem, teamUp, createdAt, solution, track, isLike, user, vote }: Idea) {
  // 每个 idea 只能点赞一次
  // 自己不能给自己点赞

  const mutation = useMutation({
    mutationFn: () => webApi.ideaApi.upvoteIdea(id)
  });

  function upvoteIdea() {}

  return (
    <Link href="/idea-bank/1">
      <div className="sm:card-hover flex flex-col gap-4 rounded-2xl bg-neutral-white px-4 py-3 shadow-idea-card sm:px-6 sm:py-5">
        <div className="flex items-center gap-2">
          {teamUp && <Badge variant="primary">Team Wanted</Badge>}
          <Badge>{ecosystem?.name?.split(' ')[0]}</Badge>
          <Badge>{track}</Badge>
        </div>
        <h2 className="body-s sm:headline-h4 font-bold text-neutral-off-black">{name}</h2>
        <p className="body-xs sm:body-s line-clamp-2 text-neutral-rich-gray">{solution}</p>
        <UpvoteButton voteCount={vote} active={isLike} onClick={upvoteIdea} />
        <div className="caption-12pt flex items-center gap-4 text-neutral-rich-gray">
          <h6>
            By <span className="underline">{user?.nickname}</span>
          </h6>
          <time dateTime="2024-06-22">{moment(createdAt).format('ll')}</time>
        </div>
      </div>
    </Link>
  );
}
