import React from 'react';
import Image from 'next/image';
import TrackTag from '@/components/Common/TrackTag';
import { EventsType } from '@/service/webApi/resourceStation/type';

interface MobEventsPastProp {
  onClick: VoidFunction;
  events: EventsType;
}

const MobEventsPast: React.FC<MobEventsPastProp> = ({ onClick, events }) => {
  return (
    <div className="flex overflow-hidden rounded-[12px] bg-neutral-white" onClick={onClick}>
      <div className="relative  w-[6rem] flex-shrink-0">
        <div className="absolute h-full w-full">
          <Image src={events.medias?.[0]} alt="event-cover" fill className="object-cover" />
        </div>
      </div>
      <div className="flex flex-col gap-[1rem] p-[1rem]">
        <p className="body-m-bold line-clamp-2 w-full text-neutral-off-black">{events.name}</p>
        <div className="flex-wap flex gap-[.25rem]">{events.tags?.map((v, i) => <TrackTag track={v} key={i} />)}</div>
      </div>
    </div>
  );
};

export default MobEventsPast;
