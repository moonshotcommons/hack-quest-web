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
        'text-neutral-rich-gray w-fit  px-[12px] py-[4px] border-[0.5px] border-neutral-rich-gray rounded-[20px]',
        className
      )}
    >
      {track}
    </div>
  );
};

export default TrackTag;
