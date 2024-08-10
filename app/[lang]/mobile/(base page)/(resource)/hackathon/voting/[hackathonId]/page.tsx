import { FC } from 'react';
import { Metadata } from 'next';
import { getHackathonById } from '@/service/cach/resource/hackathon';
import MenuLink from '@/constants/MenuLink';
import { Lang } from '@/i18n/config';
import { isUuid } from '@/helper/utils';
import { permanentRedirect } from 'next/navigation';
import HackathonVoting from './components';
import webApi from '@/service';

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
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.HACKATHON_VOTING}/${params.hackathonId}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON_VOTING}/${params.hackathonId}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON_VOTING}/${params.hackathonId}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.HACKATHON_VOTING}/${params.hackathonId}`
      }
    }
  };
}

const HackathonVotingPage: FC<HackathonVotingPageProps> = async ({ params }) => {
  const hackathon = await getHackathonById(params.hackathonId);
  if (isUuid(params.hackathonId)) {
    permanentRedirect(`${MenuLink.EXPLORE_HACKATHON}/${hackathon.alias}`);
  }

  let userInfo = null;
  try {
    userInfo = await webApi.userApi.getUserInfo();
  } catch (e) {
    permanentRedirect(MenuLink.HACKATHON_VOTING);
  }
  if (!userInfo) {
    permanentRedirect(MenuLink.HACKATHON_VOTING);
  }
  const otherHackathons = await webApi.resourceStationApi.getVoteOtherHackathons(hackathon.id);
  return (
    <>
      <HackathonVoting hackathon={hackathon} otherHackathons={otherHackathons} />
    </>
  );
};

export default HackathonVotingPage;
