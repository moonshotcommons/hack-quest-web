import React from 'react';
import TrackTag from '@/components/Common/TrackTag';
import { TfiLocationPin } from 'react-icons/tfi';
import { PiCalendarBlank } from 'react-icons/pi';
import { EventsType } from '@/service/webApi/resourceStation/type';
import dayjs from 'dayjs';

interface MobEventsUpcomingProp {
  onClick: VoidFunction;
  events: EventsType;
}

const MobEventsUpcoming: React.FC<MobEventsUpcomingProp> = ({ onClick, events }) => {
  return (
    <div
      className="flex flex-col gap-[1rem] overflow-hidden rounded-[.75rem] bg-neutral-white p-[16px]"
      onClick={onClick}
    >
      <h2 className="body-m-bold line-clamp-2  text-neutral-off-black">{events.name}</h2>
      <div className="flex flex-wrap gap-[.25rem]">{events.tags?.map((v, i) => <TrackTag track={v} key={i} />)}</div>
      <div className="body-s text-neutral-rich-gray">
        <div className="flex items-center gap-[.5rem]">
          <PiCalendarBlank />
          <span>{dayjs(events.startTime).format('MMM D,YY')}</span>
          {events.endTime && !dayjs(events.startTime).isSame(events.endTime, 'day') && (
            <span>
              {` - `}
              {dayjs(events.endTime).format('MMM D,YY')}
            </span>
          )}
        </div>
        {events.location && (
          <div className="flex items-center gap-[.5rem]">
            <TfiLocationPin />
            <span className="line-clamp-1">{events.location}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobEventsUpcoming;
