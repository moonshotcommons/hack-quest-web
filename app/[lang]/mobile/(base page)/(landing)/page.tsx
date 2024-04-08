import { Metadata, NextPage } from 'next';
import PageRetentionTime from '@/components/Common/PageRetentionTime';

import TopBanner from './components/TopBanner';
import CollaborateList from './components/CollaborateList';
import CertificatesIntroduce from './components/CertificatesIntroduce';
import BecomeWeb3 from './components/BecomeWeb3';
import CommunityIntroduction from './components/CommunityIntroduction';
import UserEvaluation from './components/UserEvaluation';
import FAQS from './components/FAQS';
import ConnectedUs from './components/ConnectedUs';
import Footer from './components/Footer';
import { Lang } from '@/i18n/config';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}`
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
      <div className="flex w-screen flex-col justify-center">
        <TopBanner lang={lang} />
        <CollaborateList lang={lang} />
        <CertificatesIntroduce lang={lang} />
        <BecomeWeb3 lang={lang} />
        <CommunityIntroduction lang={lang} />
        <UserEvaluation lang={lang} />
        <FAQS lang={lang} />
        <ConnectedUs lang={lang} />
        <Footer lang={lang} />
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
