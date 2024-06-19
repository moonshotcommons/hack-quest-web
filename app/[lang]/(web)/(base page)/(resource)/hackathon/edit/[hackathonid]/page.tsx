import { FC } from 'react';
import { Metadata } from 'next';
import MenuLink from '@/constants/MenuLink';
import { Lang } from '@/i18n/config';
import { getHackathonById } from '@/service/cach/resource/hackathon';
import { isUuid } from '@/helper/utils';
import { permanentRedirect } from 'next/navigation';
import HackathonEdit from './components';

interface HackathonIdProps {
  params: {
    hackathonId: string;
    lang: string;
  };
}

export async function generateMetadata({ params }: HackathonIdProps): Promise<Metadata> {
  const { lang, hackathonId } = params;
  return {
    title: hackathonId,
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.HACKATHON_EDIT}/${params.hackathonId}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON_EDIT}/${params.hackathonId}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON_EDIT}/${params.hackathonId}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.HACKATHON_EDIT}/${params.hackathonId}`
      }
    }
  };
}

const HackahtonEditPage: FC<HackathonIdProps> = async function ({ params }: HackathonIdProps) {
  const hackathon = await getHackathonById(params.hackathonId);
  hackathon.faqs = [{ question: 'question111', answer: 'answer222', id: '123' }];
  if (isUuid(params.hackathonId)) {
    permanentRedirect(`${MenuLink.HACKATHON_EDIT}/${hackathon.alias}`);
  }
  return (
    <>
      <HackathonEdit hackathon={hackathon} />
    </>
  );
};

export default HackahtonEditPage;
