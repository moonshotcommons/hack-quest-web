import { Metadata } from 'next';
import MenuLink from '@/constants/MenuLink';
import React from 'react';
import { Lang } from '@/i18n/config';
import webApi from '@/service';
import { EventStatus } from '@/service/webApi/resourceStation/type';
import PastPage from './components';
import LandingFooter from '@/components/Web/Business/LandingFooter';

interface EventsProp {
  params: {
    lang: Lang;
  };
}

export async function generateMetadata({ params }: EventsProp): Promise<Metadata> {
  const { lang } = params;

  const metadata: Metadata = {
    title: 'HackQuest PastEvents',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.EVENTS_PAST}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.EVENTS_PAST}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.EVENTS_PAST}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.EVENTS_PAST}`
      }
    }
  };

  return metadata;
}

const Events: React.FC<EventsProp> = async ({ params: { lang } }) => {
  const res = await webApi.resourceStationApi.getEvents({ status: EventStatus.PAST });
  const list = res.data || [];
  return (
    <div className="flex h-full flex-col pt-[48px]">
      <PastPage list={list} />
      <div className="flex-shrink-0">
        <LandingFooter lang={lang} />
      </div>
    </div>
  );
};

export default Events;
