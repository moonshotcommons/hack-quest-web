'use client';
import React from 'react';
import Image from 'next/image';
import TrackTag from '@/components/Common/TrackTag';
import moment from 'moment';
import { TfiLocationPin } from 'react-icons/tfi';
import { PiCalendarBlank } from 'react-icons/pi';
import { EventStatus, EventsType } from '@/service/webApi/resourceStation/type';
interface EventsCardProp {
  onClick: VoidFunction;
  events: EventsType;
}

const EventsCard: React.FC<EventsCardProp> = ({ onClick, events }) => {
  return (
    <div className="card-hover overflow-hidden rounded-[12px]" onClick={onClick}>
      <div className="relative h-0 w-full pt-[56%]">
        <Image src={events.images?.[0]} alt="event-cover" fill className="object-contain" />
      </div>
      <div className="flex flex-col justify-between gap-[16px] px-[16px] py-[20px]">
        <h2 className="bpdy-l-bold line-clamp-2 h-[58px] text-neutral-off-black">{events.title}</h2>
        <div className="flex flex-wrap gap-x-[8px] gap-y-[4px]">
          {events.categories?.map((v, i) => <TrackTag track={v} key={i} />)}
        </div>
        {events.status !== EventStatus.PAST && (
          <div className="body-s text-neutral-rich-gray">
            <div className="flex items-center gap-[8px]">
              <PiCalendarBlank />
              <span>{moment(events.startTime).format('ll')}</span>
              {events.status === EventStatus.IN_PROGRESS && (
                <span>
                  {` - `}
                  {moment(events.endTime).format('ll')}
                </span>
              )}
            </div>
            <div className="flex items-center gap-[8px]">
              <TfiLocationPin />
              <span>{events.location}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsCard;
