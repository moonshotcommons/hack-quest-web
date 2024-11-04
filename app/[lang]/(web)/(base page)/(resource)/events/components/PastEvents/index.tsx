'use client';
import Button from '@/components/Common/Button';
import EventsCard from '@/components/Web/Business/EventsCard';
import EventsCardModal from '@/components/Web/Business/EventsCard/EventsCardModal';
import MenuLink from '@/constants/MenuLink';
import { EventStatus, EventsType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';

interface PastEventsProp {
  list: EventsType[];
  lang: Lang;
}

const PastEvents: React.FC<PastEventsProp> = ({ list, lang }) => {
  const { t } = useTranslation(lang, TransNs.RESOURCE);
  const eventsList = useMemo(() => {
    return list
      .filter((v) => v.status === EventStatus.PAST)
      .map((v) => ({
        ...v,
        medias: v.medias?.filter((m) => /.(webp|mp4|mov)$/.test(m))
      }));
  }, [list]);
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState({});
  if (!eventsList.length) return null;
  return (
    <div className="container mx-auto mt-[60px]">
      <p className="text-h3 text-neutral-off-black">{t('events.pastEvents')}</p>
      <div className="my-[40px] flex flex-wrap gap-[20px]">
        {eventsList.slice(0, 16)?.map((v) => (
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
              {t('viewMore')}
            </Button>
          </Link>
        </div>
      )}

      <EventsCardModal events={events as EventsType} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default PastEvents;
