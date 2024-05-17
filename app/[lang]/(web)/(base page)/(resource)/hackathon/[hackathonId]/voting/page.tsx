import { FC } from 'react';
import { Metadata } from 'next';
import { getHackathonById, getHackathonsList } from '@/service/cach/resource/hackathon';
import MenuLink from '@/constants/MenuLink';
import { Lang } from '@/i18n/config';
import { isUuid } from '@/helper/utils';
import { permanentRedirect } from 'next/navigation';
import HackathonVoting from './components';

interface HackathonVotingPageProps {
  params: {
    hackathonId: string;
    lang: string;
  };
}

export async function generateMetadata({ params }: HackathonVotingPageProps): Promise<Metadata> {
  const hackathon = await getHackathonById(params.hackathonId);
  const { lang } = params;
  return {
    title: hackathon.name,
    description: hackathon.about,
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.HACKATHON}/${params.hackathonId}/voting`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON}/${params.hackathonId}/voting`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON}/${params.hackathonId}/voting`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.HACKATHON}/${params.hackathonId}/voting`
      }
    }
  };
}

const HackathonVotingPage: FC<HackathonVotingPageProps> = async ({ params }) => {
  const hackathon = await getHackathonById(params.hackathonId);
  if (isUuid(params.hackathonId)) {
    permanentRedirect(`${MenuLink.HACKATHON}/${hackathon.alias}`);
  }
  const otherHackathons = await getHackathonsList({
    status: 'past',
    page: 1,
    limit: 12
  });
  return (
    <>
      <HackathonVoting hackathon={hackathon} otherHackathons={otherHackathons.data} />
    </>
  );
};

export default HackathonVotingPage;
