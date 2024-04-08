'use client';
import EventsCard from '@/components/Web/Business/EventsCard';
import EventsCardModal from '@/components/Web/Business/EventsCard/EventsCardModal';
import React, { useState } from 'react';

interface UpcomingEventsProp {}

const UpcomingEvents: React.FC<UpcomingEventsProp> = () => {
  const eventsList = Array.from({ length: 8 }).map((_, i) => ({ id: i }));
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState({});
  return (
    <div className="container mx-auto mt-[100px]">
      <div className="mb-[60px] text-center">
        <p className="text-h2 mb-[12px] text-neutral-off-black">Upcoming Events 🗓️</p>
        <p className="body-m text-neutral-medium-gray">
          Attend our events to engage with other Web 3 enthusiasts, network with leading voices in Web 3, and build the
          future of Web 3 together with us!
        </p>
      </div>
      <div className="flex flex-wrap gap-[20px]">
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
      <EventsCardModal events={events} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default UpcomingEvents;
