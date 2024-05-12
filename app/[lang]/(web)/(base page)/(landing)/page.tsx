import { Metadata, NextPage } from 'next';
import PageRetentionTime from '@/components/Common/PageRetentionTime';

import TopBanner from './components/TopBanner';
import CollaborateList from './components/CollaborateList';
import CertificatesIntroduce from './components/CertificatesIntroduce';
import BecomeWeb3 from './components/BecomeWeb3';
import CommunityIntroduction from './components/CommunityIntroduction';
import UserEvaluation from './components/UserEvaluation';
import LandingFooter from '@/components/Web/Business/LandingFooter';
import { Lang } from '@/i18n/config';
import FAQS from './components/FAQS';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}`,
        en: `https://www.hackquest.io/${Lang.EN}`,
        zh: `https://www.hackquest.io/${Lang.ZH}`
      }
    }
  };
}

interface LandingProps {
  params: {
    lang: Lang;
  };
}

const Landing: NextPage<LandingProps> = ({ params: { lang } }) => {
  return (
    <>
      <div className="flex flex-col justify-center">
        <TopBanner lang={lang} />
        <CollaborateList lang={lang} />
        <CertificatesIntroduce lang={lang} />
        <BecomeWeb3 lang={lang} />
        <CommunityIntroduction lang={lang} />
        <UserEvaluation lang={lang} />
        <FAQS lang={lang} />
        <LandingFooter lang={lang} />
      </div>
      <PageRetentionTime trackName="landing-页面留存时间" />
    </>
  );
};

Landing.displayName = 'Landing';

// Landing.getInitialProps = (context) => {
//   return {};
// };

export default Landing;
