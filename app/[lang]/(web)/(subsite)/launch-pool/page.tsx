import { Lang } from '@/i18n/config';
import React from 'react';
import { Metadata } from 'next';
import PageRetentionTime from '@/components/Common/PageRetentionTime';

import TopBanner from './components/TopBanner';
import FAQS from './components/FAQS';
import ConnectedUs from './components/ConnectedUs';
import Footer from './components/Footer';
import DataStatistics from './components/DataStatistics';
import AllProjects from './components/AllProjects';
import HowIAOWorks from './components/HowIAOWorks';
import OnlyChooseBestProjects from './components/OnlyChooseBestProjects';
import OurSupportForProjects from './components/OurSupportForProjects';
import webApi from '@/service';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'HackQuest Launch pool',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/launch-pool`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/launch-pool`,
        en: `https://www.hackquest.io/${Lang.EN}/launch-pool`,
        zh: `https://www.hackquest.io/${Lang.ZH}/launch-pool`
      }
    }
  };
}

interface LaunchProp {
  params: {
    lang: Lang;
  };
}

const Launch: React.FC<LaunchProp> = async ({ params: { lang } }) => {
  const projects = await webApi.launchPoolApi.getProjectsFromCache();
  return (
    <>
      <div className="flex flex-col justify-center">
        <TopBanner lang={lang} />
        <DataStatistics lang={lang} />
        <AllProjects lang={lang} projects={projects.data} />
        <HowIAOWorks lang={lang} />
        <OnlyChooseBestProjects lang={lang} />
        <OurSupportForProjects lang={lang} />
        {/* <CollaborateList />
        <CertificatesIntroduce />
        <BecomeWeb3 />
        <CommunityIntroduction />
        <UserEvaluation /> */}
        <FAQS />
        <ConnectedUs />
        <Footer />
      </div>
      <PageRetentionTime trackName="landing-页面留存时间" />
    </>
  );
};

export default Launch;
