'use client';
import Button from '@/components/Common/Button';
import MobEventsCardModal from '@/components/Mobile/MobEventsCard/MobEventsCardModal';
import MobEventsPast from '@/components/Mobile/MobEventsCard/MobEventsPast';
import MenuLink from '@/constants/MenuLink';
import { EventStatus, EventsType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

interface PastEventsProp {
  list: EventsType[];
}

const PastEvents: React.FC<PastEventsProp> = ({ list }) => {
  const eventsList = useMemo(() => {
    return list
      .filter((v) => v.status === EventStatus.PAST)
      .map((v) => ({
        ...v,
        medias: v.medias?.filter((m) => /.webp$/.test(m))
      }));
  }, [list]);
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState({});
  if (!eventsList.length) return null;
  return (
    <div className="mt-[2.5rem] px-[1.25rem]">
      <p className="text-h3-mob text-neutral-off-black">Past Events</p>
      <div className="my-[1.25rem] flex flex-col gap-[1.25rem]">
        {eventsList.slice(0, 8).map((v) => (
          <div key={v.id} className="w-full">
            <MobEventsPast
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
            <Button className="button-text-s h-[2.125rem] w-[8.75rem] border border-neutral-black uppercase text-neutral-black">
              view more
            </Button>
          </Link>
        </div>
      )}

      <MobEventsCardModal open={modalOpen} onClose={() => setModalOpen(false)} events={events as EventsType} />
    </div>
  );
};

export default PastEvents;
