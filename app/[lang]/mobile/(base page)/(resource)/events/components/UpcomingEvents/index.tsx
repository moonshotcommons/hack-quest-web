'use client';
import MobEventsCardModal from '@/components/Mobile/MobEventsCard/MobEventsCardModal';
import MobEventsUpcoming from '@/components/Mobile/MobEventsCard/MobEventsUpcoming';
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
    <div className="mt-[5rem] px-[1.25rem]" id={'events-upcoming'}>
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
              events={v}
              onClick={() => {
                setModalOpen(true);
                setEvents(v);
              }}
            />
          </div>
        ))}
      </div>
      <MobEventsCardModal open={modalOpen} onClose={() => setModalOpen(false)} events={events as EventsType} />
    </div>
  );
};

export default UpcomingEvents;
