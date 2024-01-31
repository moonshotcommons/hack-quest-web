import { cn } from '@/helper/utils';
import React from 'react';

interface TrackTagProp {
  track: string;
  className?: string;
}

const TrackTag: React.FC<TrackTagProp> = ({
  track,
  className = 'caption-12pt '
}) => {
  return (
    <div
      className={cn(
        'w-fit rounded-[20px]  border-[0.5px] border-neutral-rich-gray px-[12px] py-[4px] text-neutral-rich-gray',
        className
      )}
    >
      {track}
    </div>
  );
};

export default TrackTag;
