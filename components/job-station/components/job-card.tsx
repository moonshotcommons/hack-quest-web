import * as React from 'react';
import Link from 'next/link';
import { BookmarkIcon, Clock4Icon, MapPinIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function JobCard() {
  return (
    <Link href="/jobs/developer">
      <div className="sm:card-hover relative flex w-full flex-col gap-4 rounded-2xl bg-neutral-white p-4 sm:gap-6 sm:p-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="absolute right-6 top-6 hidden outline-none sm:block" aria-hidden>
                <BookmarkIcon size={24} className="text-neutral-rich-gray" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">Saved for later</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-green-500"></div>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold">Senior Front End Developer</h3>
            <p className="text-base text-neutral-rich-gray">Google</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge size="large">Remote</Badge>
          <Badge size="large">Smart Contract</Badge>
          <Badge size="large">Bloackchain</Badge>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <span>$</span>
              <span>200-300k USD</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock4Icon className="h-5 w-5" />
              <span>Full-time</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 sm:ml-8 sm:mt-0">
            <MapPinIcon className="h-5 w-5" />
            <span>Remote</span>
          </div>
          <div className="mt-6 flex items-center justify-end gap-4 sm:ml-auto sm:mt-0">
            <time dateTime="2022-01-01" className="text-neutral-medium-gray">
              2h ago
            </time>
            <Button className="w-[165px]">Apply</Button>
          </div>
        </div>
        <button className="absolute bottom-7 left-4 block outline-none sm:hidden" aria-hidden>
          <BookmarkIcon size={24} className="text-neutral-rich-gray" />
        </button>
      </div>
    </Link>
  );
}
