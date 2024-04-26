'use client';
import MobEventsCardModal from '@/components/Mobile/MobEventsCard/MobEventsCardModal';
import MobEventsPast from '@/components/Mobile/MobEventsCard/MobEventsPast';
import MenuLink from '@/constants/MenuLink';
import useGetHeight from '@/hooks/dom/useGetHeight';
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
  const { pageHeight } = useGetHeight();
  const eventsList = useMemo(() => {
    return list.map((v) => ({
      ...v,
      medias: v.medias?.filter((m) => /.webp$/.test(m))
    }));
  }, [list]);
  return (
    <div
      className="p-[1.25rem]"
      style={{
        minHeight: pageHeight
      }}
    >
      <Link className="h-full" href={MenuLink.EVENTS}>
        <div className="body-l flex items-center gap-[7px] text-neutral-black ">
          <HiArrowLongLeft size={20}></HiArrowLongLeft>
          <span>{t('back')}</span>
        </div>
      </Link>
      <p className="text-h2-mob mb-[1.25rem] text-neutral-off-black">{t('events.pastEvents')}</p>
      <div className="flex flex-col gap-[1.25rem]">
        {eventsList.map((v) => (
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
      <MobEventsCardModal open={modalOpen} onClose={() => setModalOpen(false)} events={events as EventsType} />
    </div>
  );
};

export default PastPage;
