'use client';
import MobEventsCardModal from '@/components/Mobile/MobEventsCard/MobEventsCardModal';
import MobEventsUpcoming from '@/components/Mobile/MobEventsCard/MobEventsUpcoming';
import { useTranslation } from '@/i18n/client';
import { Lang, TransNs } from '@/i18n/config';
import { EventStatus, EventsType } from '@/service/webApi/resourceStation/type';
import React, { useMemo, useState } from 'react';

interface UpcomingEventsProp {
  list: EventsType[];
  lang: Lang;
}

const UpcomingEvents: React.FC<UpcomingEventsProp> = ({ list, lang }) => {
  const { t } = useTranslation(lang, TransNs.RESOURCE);
  const eventsList = useMemo(() => {
    return list
      .filter((v) => v.status !== EventStatus.PAST)
      .map((v) => ({
        ...v,
        medias: v.medias?.filter((m) => /.webp$/.test(m))
      }));
  }, [list]);
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState({});
  if (!eventsList.length) return null;
  return (
    <div className="mt-[5rem] px-[1.25rem]" id={'events-upcoming'}>
      <div className="mb-[2.5rem] text-center">
        <p className="text-h2-mob mb-[1rem] text-neutral-off-black">{t('events.upcomingEvents')} 🗓️</p>
        <p className="body-s text-neutral-medium-gray">{t('events.upComingDesc')}</p>
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
