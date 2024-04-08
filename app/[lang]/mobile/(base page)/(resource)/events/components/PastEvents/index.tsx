'use client';
import Button from '@/components/Common/Button';
import MobEventsCardModal from '@/components/Mobile/MobEventsCard/MobEventsCardModal';
import MobEventsPast from '@/components/Mobile/MobEventsCard/MobEventsPast';
import MenuLink from '@/constants/MenuLink';
import Link from 'next/link';
import React, { useState } from 'react';

interface PastEventsProp {}

const PastEvents: React.FC<PastEventsProp> = () => {
  const eventsList = Array.from({ length: 8 }).map((_, i) => ({ id: i }));
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState({});
  return (
    <div className="mt-[2.5rem] px-[1.25rem]">
      <p className="text-h3-mob text-neutral-off-black">Past Events</p>
      <div className="my-[1.25rem] flex flex-col gap-[1.25rem]">
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
      <div className="flex justify-center">
        <Link href={MenuLink.EVENTS_PAST}>
          <Button className="button-text-s h-[2.125rem] w-[8.75rem] border border-neutral-black uppercase text-neutral-black">
            view more
          </Button>
        </Link>
      </div>
      <MobEventsCardModal open={modalOpen} onClose={() => setModalOpen(false)} events={events} />
    </div>
  );
};

export default PastEvents;
