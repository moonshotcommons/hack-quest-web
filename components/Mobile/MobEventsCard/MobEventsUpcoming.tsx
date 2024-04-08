import React from 'react';
import TrackTag from '@/components/Common/TrackTag';
import moment from 'moment';
import { TfiLocationPin } from 'react-icons/tfi';
import { PiCalendarBlank } from 'react-icons/pi';

interface MobEventsUpcomingProp {
  onClick: VoidFunction;
}

const MobEventsUpcoming: React.FC<MobEventsUpcomingProp> = ({ onClick }) => {
  return (
    <div
      className="flex flex-col gap-[1rem] overflow-hidden rounded-[.75rem] bg-neutral-white p-[16px]"
      onClick={onClick}
    >
      <h2 className="bpdy-m-bold line-clamp-2  text-neutral-off-black">
        Blockchain UCSB Web3 Dev 101 Workshop (Spring)
      </h2>
      <div>
        <TrackTag track="HackThon" />
      </div>
      <div className="body-s text-neutral-rich-gray">
        <div className="flex items-center gap-[.5rem]">
          <PiCalendarBlank />
          <span>{moment(+new Date()).format('ll')}</span>
        </div>
        <div className="flex items-center gap-[.5rem]">
          <TfiLocationPin />
          <span>Online 🇺🇸 New York, NY</span>
        </div>
      </div>
    </div>
  );
};

export default MobEventsUpcoming;
