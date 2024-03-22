import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
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

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.hackquest.io'
  }
};

interface LaunchProp {
  params: {
    lang: Lang;
  };
}

const Launch: React.FC<LaunchProp> = async ({ params: { lang } }) => {
  const { t } = await useTranslation(lang, TransNs.LAUNCH_POOL);

  return (
    <>
      <div className="max-w-screen flex w-screen flex-col justify-center overflow-hidden">
        <TopBanner lang={lang} />
        <DataStatistics lang={lang} />
        <AllProjects lang={lang} />
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
