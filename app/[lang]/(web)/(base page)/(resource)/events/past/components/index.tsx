'use client';
import EventsCard from '@/components/Web/Business/EventsCard';
import EventsCardModal from '@/components/Web/Business/EventsCard/EventsCardModal';
import MenuLink from '@/constants/MenuLink';
import { useTranslation } from '@/i18n/client';
import { Lang, TransNs } from '@/i18n/config';
import { EventsType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { HiArrowLongLeft } from 'react-icons/hi2';

interface PastPageProp {
  list: EventsType[];
  lang: Lang;
}

const PastPage: React.FC<PastPageProp> = ({ list, lang }) => {
  const { t } = useTranslation(lang, TransNs.RESOURCE);
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState({});
  const eventsList = useMemo(() => {
    return list.map((v) => ({
      ...v,
      medias: v.medias
    }));
  }, [list]);
  return (
    <>
      <div className="container mx-auto mb-[100px] flex flex-1 flex-col">
        <div className="relative flex justify-center">
          <p className="text-h2 text-neutral-off-black">{t('events.pastEvents')}</p>
          <div className="absolute left-0 top-0 flex h-full w-full">
            <Link className="h-full" href={MenuLink.EVENTS}>
              <div className="body-m flex h-full items-center gap-[7px] text-neutral-black ">
                <HiArrowLongLeft size={20}></HiArrowLongLeft>
                <span>{t('back')}</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-[60px] flex min-h-[flex-1] flex-wrap gap-[20px]">
          {eventsList?.map((v) => (
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
      </div>

      <EventsCardModal events={events as EventsType} open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default PastPage;
