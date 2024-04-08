'use client';
import Button from '@/components/Common/Button';
import EventsCard from '@/components/Web/Business/EventsCard';
import EventsCardModal from '@/components/Web/Business/EventsCard/EventsCardModal';
import MenuLink from '@/constants/MenuLink';
import Link from 'next/link';
import React, { useState } from 'react';

interface PastEventsProp {}

const PastEvents: React.FC<PastEventsProp> = () => {
  const eventsList = Array.from({ length: 8 }).map((_, i) => ({ id: i }));
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState({});
  return (
    <div className="container mx-auto mt-[60px]">
      <p className="text-h3 text-neutral-off-black">Past Events</p>
      <div className="my-[40px] flex flex-wrap gap-[20px]">
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
      <div className="flex justify-center">
        <Link href={MenuLink.EVENTS_PAST}>
          <Button className="button-text-m h-[48px] w-[165px] border border-neutral-black uppercase text-neutral-black">
            view more
          </Button>
        </Link>
      </div>
      <EventsCardModal events={events} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default PastEvents;
