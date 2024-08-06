import { cn } from '@/helper/utils';
import React from 'react';

interface TrackTagProp {
  track: string;
  className?: string;
}

const TrackTag: React.FC<TrackTagProp> = ({ track, className = 'caption-12pt ' }) => {
  if (!track) return null;
  return (
    <div
      className={cn(
        'w-fit rounded-[1.25rem]  border-[.0313rem] border-neutral-rich-gray px-[.75rem] py-[.25rem] text-neutral-rich-gray',
        className
      )}
    >
      {track}
    </div>
  );
};

export default TrackTag;
