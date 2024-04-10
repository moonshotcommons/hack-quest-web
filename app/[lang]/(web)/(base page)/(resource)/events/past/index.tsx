'use client';
import { LangContext } from '@/components/Provider/Lang';
import EventsCard from '@/components/Web/Business/EventsCard';
import EventsCardModal from '@/components/Web/Business/EventsCard/EventsCardModal';
import LandingFooter from '@/components/Web/Business/LandingFooter';
import MenuLink from '@/constants/MenuLink';
import { EventsType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { HiArrowLongLeft } from 'react-icons/hi2';

interface PastPageProp {
  list: EventsType[];
}

const PastPage: React.FC<PastPageProp> = ({ list }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState({});
  const { lang } = useContext(LangContext);
  return (
    <div className="flex h-full flex-col pt-[48px]">
      <div className="container mx-auto mb-[100px] flex flex-1 flex-col">
        <div className="relative flex justify-center">
          <p className="text-h2 text-neutral-off-black">Past Events</p>
          <div className="absolute left-0 top-0 flex h-full w-full">
            <Link className="h-full" href={MenuLink.EVENTS}>
              <div className="body-m flex h-full items-center gap-[7px] text-neutral-black ">
                <HiArrowLongLeft size={20}></HiArrowLongLeft>
                <span>Back</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-[60px] flex min-h-[flex-1] flex-wrap gap-[20px]">
          {list.map((v) => (
            <div key={v.id} className="w-[calc((100%-60px)/4)]">
              <EventsCard
                events={v}
                onClick={() => {
                  setModalOpen(true);
                  setEvents(v);
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex-shrink-0">
        <LandingFooter lang={lang} />
      </div>
      <EventsCardModal events={events as EventsType} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default PastPage;
