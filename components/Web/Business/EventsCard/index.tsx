'use client';
import React from 'react';
import Image from 'next/image';
import TrackTag from '@/components/Common/TrackTag';
import { TfiLocationPin } from 'react-icons/tfi';
import { PiCalendarBlank } from 'react-icons/pi';
import { EventsType } from '@/service/webApi/resourceStation/type';
import CardCover from '@/public/images/resource/events_card_cover.png';
import dayjs from '@/components/Common/Dayjs';
interface EventsCardProp {
  onClick: VoidFunction;
  events: EventsType;
}

const EventsCard: React.FC<EventsCardProp> = ({ onClick, events }) => {
  return (
    <div className="card-hover overflow-hidden rounded-[16px] bg-neutral-white" onClick={onClick}>
      <div className="relative h-0 w-full pt-[56%]">
        <Image
          src={events.medias?.find((v) => /\.webp$/.test(v)) || CardCover}
          alt={events.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-between gap-[16px] px-[16px] py-[20px]">
        <h2 className="body-l-bold line-clamp-2 h-[58px] text-neutral-off-black">{events.name}</h2>
        <div className="flex flex-wrap gap-x-[8px] gap-y-[4px]">
          {events.tags?.map((v, i) => <TrackTag track={v} key={i} />)}
        </div>
        {/* {events.status !== EventStatus.PAST && ( */}
        <div className="body-s flex h-[45px] flex-col justify-end text-neutral-rich-gray">
          <div className="flex items-center gap-[8px]">
            <PiCalendarBlank />
            <span>{dayjs(events.startTime).tz().format('MMM. D, YYYY')}</span>
            {events.endTime && !dayjs(events.startTime).tz().isSame(events.endTime, 'day') && (
              <span>
                {` - `}
                {dayjs(events.endTime).tz().format('MMM. D, YYYY')}
              </span>
            )}
          </div>
          {events.location && (
            <div className="flex items-center gap-[8px]">
              <TfiLocationPin />
              <span className="line-clamp-1 flex-1">{events.location}</span>
            </div>
          )}
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default EventsCard;
