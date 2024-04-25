import { Metadata } from 'next';
import MenuLink from '@/constants/MenuLink';
import React from 'react';
import EventsBanner from './components/EventsBanner';
import UpcomingEvents from './components/UpcomingEvents';
import PastEvents from './components/PastEvents';
import ExploreMore from './components/ExploreMore';
import Reach from './components/Reach';
import { Lang } from '@/i18n/config';
import webApi from '@/service';
import MobLandingFooter from '@/components/Mobile/MobLandingFooter';

interface EventsProp {
  params: {
    lang: Lang;
  };
}

export async function generateMetadata({ params }: EventsProp): Promise<Metadata> {
  const { lang } = params;

  const metadata: Metadata = {
    title: 'HackQuest Events',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/${MenuLink.EVENTS}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/${MenuLink.EVENTS}`,
        en: `https://www.hackquest.io/${Lang.EN}/${MenuLink.EVENTS}`,
        zh: `https://www.hackquest.io/${Lang.ZH}/${MenuLink.EVENTS}`
      }
    }
  };

  return metadata;
}

const Events: React.FC<EventsProp> = async ({ params: { lang } }) => {
  const res = await webApi.resourceStationApi.getEvents();
  const list = res.data || [];
  return (
    <div>
      <EventsBanner lang={lang} />
      <UpcomingEvents lang={lang} list={list} />
      <PastEvents list={list} lang={lang} />
      <ExploreMore lang={lang} />
      <Reach lang={lang} />
      <div id="events-footer">
        <MobLandingFooter lang={lang} />
      </div>
    </div>
  );
};

export default Events;
