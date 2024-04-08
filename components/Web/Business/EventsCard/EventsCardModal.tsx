import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import SwiperContainer from '@/components/Common/SwiperContainer';
import TrackTag from '@/components/Common/TrackTag';
import moment from 'moment';
import React from 'react';
import { FiX } from 'react-icons/fi';
import { PiCalendarBlank } from 'react-icons/pi';
import { TfiLocationPin } from 'react-icons/tfi';
import { SwiperSlide } from 'swiper/react';
import EventsCardCover from '@/public/images/resource/events_card_cover.png';
import Image from 'next/image';

interface EventsCardModalProp {
  onClose: VoidFunction;
  open: boolean;
  events: any;
}

const EventsCardModal: React.FC<EventsCardModalProp> = ({ onClose, open, events }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseIcon={true}
      icon={<FiX size={26} />}
      iconClassName="right-[24px] top-[24px]"
    >
      <div className="   w-[840px] rounded-[16px] bg-neutral-white p-[24px] pt-[48px] shadow-[0_4px_8px_0_rgba(0,0,0,0.12)]">
        <div className="flex justify-between py-[12px]">
          <div className="w-[372px]">
            <div className="mb-[24px] w-full">
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
            <p className="body-l-bold  text-neutral-black">ETH ShangHai</p>
            <div className="my-[16px] flex flex-wrap gap-[12px]">
              <TrackTag track="Hackathon" />
            </div>
            <div className="body-s text-neutral-rich-gray">
              <div className="flex items-center gap-[8px]">
                <PiCalendarBlank />
                <span>
                  {moment(+new Date()).format('ll')}
                  {' - '}
                  {moment(+new Date()).format('ll')}
                </span>
              </div>
              <div className="flex items-center gap-[8px]">
                <TfiLocationPin />
                <span>Online 🇺🇸 New York, NY</span>
              </div>
            </div>
          </div>
          <div className="flex w-[372px] flex-col justify-between">
            <p className="body-s scroll-wrap-y max-h-[400px] text-neutral-off-black">
              From June 25th to July 7th, 2023, HackQuest co-hosted ETH Shanghai with Mask Network, Moonshot Commons,
              and Tsinghua University Blockchain Association (THUBA) in the ETH ShangHai Hackathon. The ETH Shanghai
              Hackathon united a diverse community of intellectuals and developers worldwide, showcasing their talents
              and groundbreaking innovations in the field of crypto technology.
            </p>
            <div className="flex justify-end pt-[20px]">
              <Button className="button-text-s h-[34px] w-[140px] border border-neutral-black p-0 uppercase text-neutral-black">
                learn more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EventsCardModal;
