import { ChevronRightIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { UpvoteButton } from './upvote-button';

export function IdeaDetailCard() {
  return (
    <div className="flex flex-col gap-5 sm:w-[32rem] sm:rounded-2xl sm:border sm:border-neutral-light-gray sm:bg-neutral-white sm:p-6">
      <h2 className="font-next-book-bold text-lg font-bold text-neutral-off-black sm:text-[1.75rem]">
        Lorem ipsum dolor sit amet
      </h2>
      <div className="flex w-full flex-col gap-2">
        <div className="sm:body-m body-s grid grid-cols-2">
          <span className="text-neutral-medium-gray">Idea Provided by</span>
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-yellow-dark sm:h-7 sm:w-7"></span>
            <div className="relative flex items-center gap-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-yellow-dark">
              <span className="text-neutral-off-black">Harry Porter</span>
              <ChevronRightIcon size={20} />
            </div>
          </div>
        </div>
        <div className="sm:body-m body-s grid grid-cols-2">
          <span className="text-neutral-medium-gray">Ecosystem</span>
          <span className="text-neutral-off-black">Solana</span>
        </div>
        <div className="sm:body-m body-s grid grid-cols-2">
          <span className="text-neutral-medium-gray">Track</span>
          <span className="text-neutral-off-black">DeFi</span>
        </div>
        <div className="sm:body-m body-s grid grid-cols-2">
          <span className="text-neutral-medium-gray">Creation Time</span>
          <span className="text-neutral-off-black">June 22, 2024</span>
        </div>
      </div>
      <Separator />
      <div className="flex w-full flex-col gap-2">
        <div className="sm:body-m body-s grid grid-cols-2">
          <span className="text-neutral-medium-gray">Open to Team up</span>
          <span className="text-neutral-off-black">Yes</span>
        </div>
        <div className="sm:body-m body-s grid grid-cols-2">
          <span className="text-neutral-medium-gray">Email</span>
          <span className="text-neutral-off-black">NqF4H@example.com</span>
        </div>
      </div>
      <Separator />
      <UpvoteButton size="large" voteCount={125} active={true} />
    </div>
  );
}
