'use client';
import EventsCard from '@/components/Web/Business/EventsCard';
import EventsCardModal from '@/components/Web/Business/EventsCard/EventsCardModal';
import LandingFooter from '@/components/Web/Business/LandingFooter';
import MenuLink from '@/constants/MenuLink';
import Link from 'next/link';
import React, { useState } from 'react';
import { HiArrowLongLeft } from 'react-icons/hi2';

interface PastPageProp {}

const PastPage: React.FC<PastPageProp> = () => {
  const eventsList = Array.from({ length: 8 }).map((_, i) => ({ id: i }));
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState({});
  return (
    <div className="flex h-full flex-col pt-[48px]">
      <div className="container mx-auto mb-[100px] flex flex-1 flex-col">
        <div className="relative flex justify-center">
          <p className="text-h2 text-neutral-off-black">Past Events</p>
          <div className="absolute left-0 top-0 h-full w-full">
            <Link className="h-full" href={MenuLink.EVENTS}>
              <div className="body-m flex h-full items-center gap-[7px] text-neutral-black ">
                <HiArrowLongLeft size={20}></HiArrowLongLeft>
                <span>Back</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-[60px] flex min-h-[flex-1] flex-wrap gap-[20px]">
          {eventsList.map((v) => (
            <div key={v.id} className="w-[calc((100%-60px)/4)]">
              <EventsCard
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
        <LandingFooter />
      </div>
      <EventsCardModal events={events} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default PastPage;
