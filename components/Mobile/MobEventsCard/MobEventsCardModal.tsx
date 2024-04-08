import Button from '@/components/Common/Button';
import SwiperContainer from '@/components/Common/SwiperContainer';
import TrackTag from '@/components/Common/TrackTag';
import moment from 'moment';
import React from 'react';
import { PiCalendarBlank } from 'react-icons/pi';
import { TfiLocationPin } from 'react-icons/tfi';
import { SwiperSlide } from 'swiper/react';
import EventsCardCover from '@/public/images/resource/events_card_cover.png';
import Image from 'next/image';
import { HiArrowLongLeft } from 'react-icons/hi2';
import useGetHeight from '@/hooks/dom/useGetHeight';
import { motion } from 'framer-motion';
import { animateProps } from './type';

interface MobEventsCardModalProp {
  onClose: VoidFunction;
  open: boolean;
  events: any;
}

const MobEventsCardModal: React.FC<MobEventsCardModalProp> = ({ onClose, open, events }) => {
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
            {Array.from({ length: 4 }).map((_, i) => (
              <SwiperSlide key={i}>
                <div className="relative h-0 w-full overflow-hidden rounded-[16px] pt-[60%]">
                  <Image src={EventsCardCover} alt="event-cover" fill className="object-cover" />
                </div>
              </SwiperSlide>
            ))}
          </SwiperContainer>
        </div>
        <p className="body-l-bold text-neutral-black">ETH ShangHai</p>
        <div className="flex-wap my-[1rem] flex gap-[.75rem]">
          <TrackTag track="Hackathon" />
        </div>
        <div className="body-s text-neutral-rich-gray">
          <div className="flex items-center gap-[.5rem]">
            <PiCalendarBlank />
            <span>
              {moment(+new Date()).format('ll')}
              {' - '}
              {moment(+new Date()).format('ll')}
            </span>
          </div>
          <div className="flex items-center gap-[.5rem]">
            <TfiLocationPin />
            <span>Online 🇺🇸 New York, NY</span>
          </div>
        </div>
        <p className="body-s mt-[2.5rem] text-neutral-off-black">
          From June 25th to July 7th, 2023, HackQuest co-hosted ETH Shanghai with Mask Network, Moonshot Commons, and
          Tsinghua University Blockchain Association (THUBA) in the ETH ShangHai Hackathon. The ETH Shanghai Hackathon
          united a diverse community of intellectuals and developers worldwide, showcasing their talents and
          groundbreaking innovations in the field of crypto technology.
        </p>

        <div className="mt-[2.5rem]">
          <Button className="button-text-m h-[3rem] w-full border border-neutral-black uppercase text-neutral-black">
            learn more
          </Button>
        </div>
      </motion.ul>
    )
  );
};

export default MobEventsCardModal;
