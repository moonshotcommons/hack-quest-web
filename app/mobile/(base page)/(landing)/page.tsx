import { NextPage } from 'next';
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
        <ConnectedUs />
        <Footer />
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
