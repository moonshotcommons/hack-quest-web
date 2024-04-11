'use client';
import EventsCard from '@/components/Web/Business/EventsCard';
import EventsCardModal from '@/components/Web/Business/EventsCard/EventsCardModal';
import { EventStatus, EventsType } from '@/service/webApi/resourceStation/type';
import React, { useMemo, useState } from 'react';

interface UpcomingEventsProp {
  list: EventsType[];
}

const UpcomingEvents: React.FC<UpcomingEventsProp> = ({ list }) => {
  const eventsList = useMemo(() => {
    return list.filter((v) => v.status === EventStatus.UPCOMING);
  }, [list]);
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState({});
  if (!eventsList.length) return null;
  return (
    <div className="container mx-auto mt-[100px]" id={'events-upcoming'}>
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
              events={v}
              onClick={() => {
                setModalOpen(true);
                setEvents(v);
              }}
            />
          </div>
        ))}
      </div>
      <EventsCardModal events={events as EventsType} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default UpcomingEvents;
