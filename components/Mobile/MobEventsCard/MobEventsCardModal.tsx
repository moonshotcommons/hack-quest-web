import Button from '@/components/Common/Button';
import SwiperContainer from '@/components/Common/SwiperContainer';
import TrackTag from '@/components/Common/TrackTag';
import moment from 'moment';
import React, { useMemo } from 'react';
import { PiCalendarBlank } from 'react-icons/pi';
import { TfiLocationPin } from 'react-icons/tfi';
import { SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { HiArrowLongLeft } from 'react-icons/hi2';
import useGetHeight from '@/hooks/dom/useGetHeight';
import { motion } from 'framer-motion';
import { animateProps } from './type';
import { EventsType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import CardCover from '@/public/images/resource/events_card_cover.png';

interface MobEventsCardModalProp {
  onClose: VoidFunction;
  open: boolean;
  events: EventsType;
}

const MobEventsCardModal: React.FC<MobEventsCardModalProp> = ({ onClose, open, events }) => {
  const medias = useMemo(() => {
    return events?.medias?.length ? events?.medias : [CardCover];
  }, [events]);
  const { pageHeight } = useGetHeight();
  return (
    open && (
      <motion.ul
        {...animateProps}
        className="scroll-wrap-y fixed left-0 top-[4rem] z-[10] flex w-[100vw] flex-col bg-neutral-off-white p-[1.25rem]"
        style={{
          height: pageHeight
        }}
      >
        <div className="body-l flex items-center gap-[7px] text-neutral-black " onClick={onClose}>
          <HiArrowLongLeft size={20}></HiArrowLongLeft>
          <span>Back</span>
        </div>
        <div className="my-[1.25rem]">
          <SwiperContainer>
            {medias?.map((v, i) => (
              <SwiperSlide key={i}>
                <div className="relative h-0 w-full overflow-hidden rounded-[16px] pt-[60%]">
                  <Image src={v} alt={events.name} fill className="object-cover" />
                </div>
              </SwiperSlide>
            ))}
          </SwiperContainer>
        </div>
        <p className="body-l-bold text-neutral-black">{events.name}</p>
        <div className="flex-wap my-[1rem] flex gap-[.25rem]">
          {events.tags?.map((v, i) => <TrackTag track={v} key={i} />)}
        </div>
        <div className="body-s text-neutral-rich-gray">
          <div className="flex items-center gap-[.5rem]">
            <PiCalendarBlank />
            <span>
              {moment(events.startTime).format('ll')}
              {' - '}
              {moment(events.endTime).format('ll')}
            </span>
          </div>
          <div className="flex items-center gap-[.5rem]">
            <TfiLocationPin />
            <span>{events.location}</span>
          </div>
        </div>
        <p className="body-s mt-[2.5rem] text-neutral-off-black">{events.description}</p>
        {events.eventUrl && (
          <div className="mt-[2.5rem]">
            <Link href={events.eventUrl}>
              <Button className="button-text-m h-[3rem] w-full border border-neutral-black uppercase text-neutral-black">
                learn more
              </Button>
            </Link>
          </div>
        )}
      </motion.ul>
    )
  );
};

export default MobEventsCardModal;
