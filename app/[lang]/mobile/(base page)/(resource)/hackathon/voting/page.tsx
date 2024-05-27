import React from 'react';
import { PageLayout } from '@/components/hackathon/page-layout';
import { Metadata } from 'next';
import MenuLink from '@/constants/MenuLink';
import { Lang, TransNs } from '@/i18n/config';
import { getFeaturedProjects, getHackathonVote } from '@/service/cach/resource/hackathon';
import HackathonVoting from './components';
import FeaturedProjects from '../components/FeaturedProject';
import { useTranslation } from '@/i18n/server';

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
  const { t } = await useTranslation(lang, TransNs.HACKATHON);
  const [features, hackathons] = await Promise.all([getFeaturedProjects(), getHackathonVote()]);
  return (
    <div className="">
      <div className="">
        <PageLayout lang={lang} slug="hackathon_voting" title={t('voting.title')} description={t('voting.description')}>
          <HackathonVoting hackathons={hackathons || []} lang={lang} />
        </PageLayout>
        <div className="px-[1.25rem]">
          <FeaturedProjects projectList={features} title={'featuredProjects'} />
        </div>
      </div>
    </div>
  );
};

export default HackathonVotingPage;
