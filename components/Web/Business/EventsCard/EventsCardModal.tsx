'use client';
import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import SwiperContainer from '@/components/Common/SwiperContainer';
import TrackTag from '@/components/Common/TrackTag';
import React, { useContext, useMemo } from 'react';
import { FiX } from 'react-icons/fi';
import { PiCalendarBlank } from 'react-icons/pi';
import { TfiLocationPin } from 'react-icons/tfi';
import { SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { EventsType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import CardCover from '@/public/images/resource/events_card_cover.png';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import dayjs from '@/components/Common/Dayjs';

interface EventsCardModalProp {
  onClose: VoidFunction;
  open: boolean;
  events: EventsType;
}

const EventsCardModal: React.FC<EventsCardModalProp> = ({ onClose, open, events }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.RESOURCE);
  const medias = useMemo(() => {
    return events?.medias?.length ? events?.medias : [CardCover];
  }, [events]);
  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseIcon={true}
      icon={<FiX size={26} />}
      iconClassName="right-[24px] top-[24px]"
    >
      <div className="w-[840px] rounded-[16px] bg-neutral-white p-[24px] pt-[48px] shadow-[0_4px_8px_0_rgba(0,0,0,0.12)]">
        <div className="flex justify-between py-[12px]">
          <div className="w-[372px]">
            <div className="mb-[24px] w-full">
              {medias ? (
                <SwiperContainer isNavigation={medias?.length > 1} isSimulateTouch={false}>
                  {medias?.map((v, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="relative h-0 w-full overflow-hidden rounded-[16px] pt-[60%]">
                          {typeof v === 'string' && /\.webp$/.test(v) && (
                            <Image src={v} alt={events.name} fill className="object-cover" />
                          )}
                          {typeof v === 'string' && /\.(mp4|mov)$/.test(v) && (
                            <video controls className="absolute left-0 top-0 h-full w-full">
                              <source src={v} />
                            </video>
                          )}
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </SwiperContainer>
              ) : null}
            </div>
            <p className="body-xl-bold  text-neutral-black">{events.name}</p>
            <div className="my-[16px] flex flex-wrap gap-[12px]">
              {events.tags?.map((v, i) => <TrackTag track={v} key={i} />)}
            </div>
            <div className="body-s text-neutral-rich-gray">
              <div className="flex items-center gap-[8px]">
                <PiCalendarBlank />
                <span>
                  {dayjs(events.startTime).tz().format('MMM. D, YYYY')}
                  {events.endTime && !dayjs(events.startTime).tz().isSame(events.endTime, 'day') && (
                    <>
                      {' - '}
                      {dayjs(events.endTime).tz().format('MMM. D, YYYY')}
                    </>
                  )}
                </span>
              </div>
              {events.location && (
                <div className="flex items-center gap-[8px]">
                  <TfiLocationPin />
                  <span>{events.location}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex w-[372px] flex-col justify-between">
            <p className="body-s scroll-wrap-y max-h-[400px] text-neutral-off-black">{events.description}</p>
            {events.eventUrl && (
              <div className="flex justify-end pt-[20px]">
                <Link href={events.eventUrl} className="outline-none">
                  <Button className="button-text-s h-[34px] w-[140px] border border-neutral-black p-0 uppercase text-neutral-black">
                    {t('learnMore')}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EventsCardModal;
