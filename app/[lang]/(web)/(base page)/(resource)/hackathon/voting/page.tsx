import React from 'react';
import { PageLayout } from '@/components/hackathon/page-layout';
import { Metadata } from 'next';
import MenuLink from '@/constants/MenuLink';
import { Lang, TransNs } from '@/i18n/config';
import { getFeaturedProjects, getHackathonsList } from '@/service/cach/resource/hackathon';
import HackathonVoting from './components';
import FeaturedProjects from '../components/FeaturedProject';
import { HackathonStatusType } from '@/service/webApi/resourceStation/type';
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
  const [features, hackathon] = await Promise.all([
    getFeaturedProjects(),
    getHackathonsList({ status: HackathonStatusType.ON_GOING })
  ]);
  return (
    <div className="container mx-auto">
      <PageLayout lang={lang} slug="hackathon_voting" title={t('voting.title')} description={t('voting.description')}>
        <HackathonVoting hackathons={hackathon?.data || []} lang={lang} />
      </PageLayout>
      <FeaturedProjects projectList={features} />
    </div>
  );
};

export default HackathonVotingPage;
