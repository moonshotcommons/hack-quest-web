'use client';
import React from 'react';
import EventsCardCover from '@/public/images/resource/events_card_cover.png';
import Image from 'next/image';
import TrackTag from '@/components/Common/TrackTag';
import moment from 'moment';
import { TfiLocationPin } from 'react-icons/tfi';
import { PiCalendarBlank } from 'react-icons/pi';
interface EventsCardProp {
  onClick: VoidFunction;
}

const EventsCard: React.FC<EventsCardProp> = ({ onClick }) => {
  return (
    <div className="card-hover overflow-hidden rounded-[12px]" onClick={onClick}>
      <div className="relative h-0 w-full pt-[56%]">
        <Image src={EventsCardCover} alt="event-cover" fill className="object-contain" />
      </div>
      <div className="flex flex-col justify-between gap-[16px] px-[16px] py-[20px]">
        <h2 className="bpdy-l-bold line-clamp-2 h-[58px] text-neutral-off-black">
          Blockchain UCSB Web3 Dev 101 Workshop (Spring)
        </h2>
        <div>
          <TrackTag track="HackThon" />
        </div>
        <div className="body-s text-neutral-rich-gray">
          <div className="flex items-center gap-[8px]">
            <PiCalendarBlank />
            <span>{moment(+new Date()).format('ll')}</span>
          </div>
          <div className="flex items-center gap-[8px]">
            <TfiLocationPin />
            <span>Online 🇺🇸 New York, NY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsCard;
