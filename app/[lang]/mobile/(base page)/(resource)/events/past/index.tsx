'use client';
import MobEventsCardModal from '@/components/Mobile/MobEventsCard/MobEventsCardModal';
import MobEventsPast from '@/components/Mobile/MobEventsCard/MobEventsPast';
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
    <div className="p-[1.25rem]">
      <Link className="h-full" href={MenuLink.EVENTS}>
        <div className="body-l flex items-center gap-[7px] text-neutral-black ">
          <HiArrowLongLeft size={20}></HiArrowLongLeft>
          <span>Back</span>
        </div>
      </Link>
      <p className="text-h2-mob mb-[1.25rem] text-neutral-off-black">Past Events</p>
      <div className="flex flex-col gap-[1.25rem]">
        {eventsList.map((v) => (
          <div key={v.id} className="w-full">
            <MobEventsPast
              onClick={() => {
                setModalOpen(true);
                setEvents(v);
              }}
            />
          </div>
        ))}
      </div>
      <MobEventsCardModal open={modalOpen} onClose={() => setModalOpen(false)} events={events} />
    </div>
  );
};

export default PastPage;
