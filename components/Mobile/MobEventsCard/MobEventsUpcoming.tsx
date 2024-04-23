import React from 'react';
import TrackTag from '@/components/Common/TrackTag';
import moment from 'moment';
import { TfiLocationPin } from 'react-icons/tfi';
import { PiCalendarBlank } from 'react-icons/pi';
import { EventsType } from '@/service/webApi/resourceStation/type';

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
          <span>{moment(events.startTime).format('ll')}</span>
        </div>
        <div className="flex items-center gap-[.5rem]">
          <TfiLocationPin />
          <span>{events.location}</span>
        </div>
      </div>
    </div>
  );
};

export default MobEventsUpcoming;
