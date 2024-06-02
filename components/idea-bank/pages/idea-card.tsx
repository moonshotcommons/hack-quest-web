import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { UpvoteButton } from './upvote-button';

export function IdeaCard() {
  return (
    <Link href="/idea-bank/1">
      <div className="sm:card-hover flex flex-col gap-4 rounded-2xl bg-neutral-white px-4 py-3 shadow-idea-card sm:px-6 sm:py-5">
        <div className="flex items-center gap-2">
          <Badge variant="primary">Team Wanted</Badge>
          <Badge>Solana</Badge>
          <Badge>DeFi</Badge>
        </div>
        <h2 className="body-s sm:headline-h4 font-bold text-neutral-off-black">Lorem ipsum dolor sit amet</h2>
        <p className="body-xs sm:body-s line-clamp-2 text-neutral-rich-gray">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed
        </p>
        <UpvoteButton voteCount={10} active={true} />
        <div className="caption-12pt flex items-center gap-4 text-neutral-rich-gray">
          <h6>
            By <span className="underline">Harry Porter</span>
          </h6>
          <time dateTime="2024-06-22">June 22, 2024</time>
        </div>
      </div>
    </Link>
  );
}
