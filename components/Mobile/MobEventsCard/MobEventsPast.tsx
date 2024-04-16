import React from 'react';
import Image from 'next/image';
import TrackTag from '@/components/Common/TrackTag';
import { EventsType } from '@/service/webApi/resourceStation/type';
import CardCover from '@/public/images/resource/events_card_cover.png';

interface MobEventsPastProp {
  onClick: VoidFunction;
  events: EventsType;
}

const MobEventsPast: React.FC<MobEventsPastProp> = ({ onClick, events }) => {
  return (
    <div className="flex overflow-hidden rounded-[12px] bg-neutral-white" onClick={onClick}>
      <div className="relative  w-[6rem] flex-shrink-0">
        <div className="absolute h-full w-full">
          <Image src={events.medias?.[0] || CardCover} alt={events.name} fill className="object-cover" />
        </div>
      </div>
      <div className="flex flex-col gap-[1rem] p-[1rem]">
        <h2 className="body-m-bold line-clamp-2 w-full text-neutral-off-black">{events.name}</h2>
        <div className="flex-wap flex gap-[.25rem]">{events.tags?.map((v, i) => <TrackTag track={v} key={i} />)}</div>
      </div>
    </div>
  );
};

export default MobEventsPast;
