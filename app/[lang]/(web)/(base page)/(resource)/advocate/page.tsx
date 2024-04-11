import { FC } from 'react';
import TopBanner from './components/TopBanner';
import DataStatistics from './components/DataStatistics';
import CommunityIRL from './components/CommunityIRL';
import DifferenceAdvocate from './components/DifferenceAdvocate';
import AdvocateBenefits from './components/AdvocateBenefits';
import UserEvaluation from './components/UserEvaluation';
import ApplyAdvocate from './components/ApplyAdvocate';
import FAQS from './components/FAQS';
import { Metadata } from 'next';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import LandingFooter from '@/components/Web/Business/LandingFooter';

interface AdvocatePageProps {
  params: {
    lang: Lang;
  };
}

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'HackQuest Advocate',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/advocate`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/advocate`,
        en: `https://www.hackquest.io/${Lang.EN}/advocate`,
        zh: `https://www.hackquest.io/${Lang.ZH}/advocate`
      }
    }
  };
}

const AdvocatePage: FC<AdvocatePageProps> = async ({ params: { lang } }) => {
  const { t } = await useTranslation(lang, TransNs.RESOURCE);
  return (
    <div className="w-full">
      <TopBanner lang={lang} />
      <DataStatistics lang={lang} />
      <CommunityIRL lang={lang} />
      <DifferenceAdvocate lang={lang} />
      <AdvocateBenefits lang={lang} />
      <UserEvaluation lang={lang} />
      <ApplyAdvocate lang={lang} />
      <FAQS lang={lang} />
      {/* <ConnectedUs />
      <Footer /> */}
      <LandingFooter lang={lang} />
    </div>
  );
};

export default AdvocatePage;
