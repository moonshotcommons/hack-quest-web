import React from 'react';
import { PageLayout } from '@/components/hackathon/page-layout';
import { Metadata } from 'next';
import MenuLink from '@/constants/MenuLink';
import { Lang } from '@/i18n/config';
import { getFeaturedProjects, getHackathonsList } from '@/service/cach/resource/hackathon';
import HackathonVoting from './components';
import FeaturedProjects from '../components/FeaturedProject';
import { HackathonStatusType } from '@/service/webApi/resourceStation/type';

interface HackathonVotingPageProp {
  params: { lang: Lang };
}

export async function generateMetadata(props: HackathonVotingPageProp): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'Hackathons | HackQuest',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.HACKATHON_VOTING}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON_VOTING}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON_VOTING}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.HACKATHON_VOTING}`
      }
    }
  };
}

const HackathonVotingPage: React.FC<HackathonVotingPageProp> = async ({ params }) => {
  const { lang } = params;
  const [features, hackathon] = await Promise.all([
    getFeaturedProjects(),
    getHackathonsList({ status: HackathonStatusType.ON_GOING })
  ]);
  return (
    <div className="">
      <div className="">
        <PageLayout
          title="Hackathon Voting"
          description="Get ready to make a difference! 🌟 Vote for your favorite projects in the hackathon. Your opinion counts! Let's support these awesome ideas together! 🚀"
        >
          <HackathonVoting hackathons={hackathon?.data || []} lang={lang} />
        </PageLayout>
        <div className="px-[1.25rem]">
          <FeaturedProjects projectList={features} title={'featuredProjects'} />
        </div>
      </div>
    </div>
  );
};

export default HackathonVotingPage;
