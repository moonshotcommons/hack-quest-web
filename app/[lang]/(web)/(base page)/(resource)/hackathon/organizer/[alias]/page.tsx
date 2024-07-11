import { FC } from 'react';
import { Metadata } from 'next';
import MenuLink from '@/constants/MenuLink';
import { Lang } from '@/i18n/config';
import { getHackathonById } from '@/service/cach/resource/hackathon';
import { isUuid } from '@/helper/utils';
import { permanentRedirect } from 'next/navigation';
import HackathonEditDetail from './components';
import webApi from '@/service';

interface HackathonIdProps {
  params: {
    alias: string;
    lang: string;
  };
}

export async function generateMetadata({ params }: HackathonIdProps): Promise<Metadata> {
  const { lang, alias } = params;
  return {
    title: alias,
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.HACKATHON_ORGANIZER}/${params.alias}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON_ORGANIZER}/${params.alias}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON_ORGANIZER}/${params.alias}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.HACKATHON_ORGANIZER}/${params.alias}`
      }
    }
  };
}

const HackahtonEditPage: FC<HackathonIdProps> = async function ({ params }: HackathonIdProps) {
  const hackathon = await getHackathonById(params.alias);
  if (isUuid(params.alias)) {
    permanentRedirect(`${MenuLink.HACKATHON_ORGANIZER}/${hackathon.alias}`);
  }

  let userInfo = null;

  try {
    userInfo = await webApi.userApi.getUserInfo();
  } catch (e) {
    permanentRedirect(`/404`);
  }

  if (!userInfo || userInfo.id !== hackathon.creatorId) {
    permanentRedirect(`/404`);
  }

  return (
    <>
      <HackathonEditDetail hackathon={hackathon} isEdit={true} />
    </>
  );
};

export default HackahtonEditPage;
