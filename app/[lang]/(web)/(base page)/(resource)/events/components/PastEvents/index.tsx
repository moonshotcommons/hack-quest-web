'use client';
import Button from '@/components/Common/Button';
import EventsCard from '@/components/Web/Business/EventsCard';
import EventsCardModal from '@/components/Web/Business/EventsCard/EventsCardModal';
import MenuLink from '@/constants/MenuLink';
import { EventStatus, EventsType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

interface PastEventsProp {
  list: EventsType[];
}

const PastEvents: React.FC<PastEventsProp> = ({ list }) => {
  const eventsList = useMemo(() => {
    return list.filter((v) => v.status === EventStatus.PAST);
  }, [list]);
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState({});
  if (!eventsList.length) return null;
  return (
    <div className="container mx-auto mt-[60px]">
      <p className="text-h3 text-neutral-off-black">Past Events</p>
      <div className="my-[40px] flex flex-wrap gap-[20px]">
        {eventsList.slice(0, 8)?.map((v) => (
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
      {eventsList.length > 8 && (
        <div className="flex justify-center">
          <Link href={MenuLink.EVENTS_PAST}>
            <Button className="button-text-m h-[48px] w-[165px] border border-neutral-black uppercase text-neutral-black">
              view more
            </Button>
          </Link>
        </div>
      )}

      <EventsCardModal events={events as EventsType} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default PastEvents;
