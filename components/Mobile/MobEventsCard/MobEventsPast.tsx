import React from 'react';
import EventsCardCover from '@/public/images/resource/events_card_cover.png';
import Image from 'next/image';
import TrackTag from '@/components/Common/TrackTag';

interface MobEventsPastProp {
  onClick: VoidFunction;
}

const MobEventsPast: React.FC<MobEventsPastProp> = ({ onClick }) => {
  return (
    <div className="flex overflow-hidden rounded-[12px] bg-neutral-white" onClick={onClick}>
      <div className="relative  w-[6rem] flex-shrink-0">
        <div className="absolute h-full w-full">
          <Image src={EventsCardCover} alt="event-cover" fill className="object-cover" />
        </div>
      </div>
      <div className="flex flex-col gap-[1rem] p-[1rem]">
        <p className="body-m-bold line-clamp-2 w-full text-neutral-off-black">Solana Chengdu</p>
        <div className="flex-wap flex gap-[.5rem]">
          <TrackTag track="Hackathon" />
        </div>
      </div>
    </div>
  );
};

export default MobEventsPast;
