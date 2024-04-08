import { Metadata, NextPage } from 'next';
import PageRetentionTime from '@/components/Common/PageRetentionTime';

import TopBanner from './components/TopBanner';
import CollaborateList from './components/CollaborateList';
import CertificatesIntroduce from './components/CertificatesIntroduce';
import BecomeWeb3 from './components/BecomeWeb3';
import CommunityIntroduction from './components/CommunityIntroduction';
import UserEvaluation from './components/UserEvaluation';
import FAQS from './components/FAQS';
import MobLandingFooter from '@/components/Mobile/MobLandingFooter';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}`
    }
  };
}

const Landing: NextPage<any> = (props) => {
  return (
    <>
      <div className="flex w-screen flex-col justify-center">
        <TopBanner />
        <CollaborateList />
        <CertificatesIntroduce />
        <BecomeWeb3 />
        <CommunityIntroduction />
        <UserEvaluation />
        <FAQS />
        <MobLandingFooter />
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
