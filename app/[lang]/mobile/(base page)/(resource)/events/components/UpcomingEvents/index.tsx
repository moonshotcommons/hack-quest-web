'use client';
import MobEventsCardModal from '@/components/Mobile/MobEventsCard/MobEventsCardModal';
import MobEventsUpcoming from '@/components/Mobile/MobEventsCard/MobEventsUpcoming';
import React, { useState } from 'react';

interface UpcomingEventsProp {}

const UpcomingEvents: React.FC<UpcomingEventsProp> = () => {
  const eventsList = Array.from({ length: 8 }).map((_, i) => ({ id: i }));
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState({});
  return (
    <div className="mt-[5rem] px-[1.25rem]">
      <div className="mb-[2.5rem] text-center">
        <p className="text-h2-mob mb-[1rem] text-neutral-off-black">Upcoming Events 🗓️</p>
        <p className="body-s text-neutral-medium-gray">
          Attend our events to engage with other Web 3 enthusiasts, network with leading voices in Web 3, and build the
          future of Web 3 together with us!
        </p>
      </div>
      <div className="flex flex-col gap-[1.25rem]">
        {eventsList.map((v) => (
          <div key={v.id} className="w-full">
            <MobEventsUpcoming
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

export default UpcomingEvents;
