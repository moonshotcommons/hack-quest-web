import { Metadata } from 'next';
import MenuLink from '@/constants/MenuLink';
import React from 'react';
import { Lang } from '@/i18n/config';
import webApi from '@/service';
import PastPage from '.';
import { EventStatus } from '@/service/webApi/resourceStation/type';

interface PastProp {
  params: {
    lang: Lang;
  };
}

export async function generateMetadata({ params }: PastProp): Promise<Metadata> {
  const { lang } = params;

  const metadata: Metadata = {
    title: 'HackQuest PastEvents',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/${MenuLink.EVENTS_PAST}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/${MenuLink.EVENTS_PAST}`,
        en: `https://www.hackquest.io/${Lang.EN}/${MenuLink.EVENTS_PAST}`,
        zh: `https://www.hackquest.io/${Lang.ZH}/${MenuLink.EVENTS_PAST}`
      }
    }
  };

  return metadata;
}

const Past: React.FC<PastProp> = async ({ params: { lang } }) => {
  const res = await webApi.resourceStationApi.getEvents({ status: EventStatus.PAST });
  const list = res.data || [];

  return <PastPage list={list} lang={lang} />;
};

export default Past;
