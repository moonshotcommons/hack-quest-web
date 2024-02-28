import { NextPage } from 'next';
import PageRetentionTime from '@/components/Common/PageRetentionTime';

import TopBanner from './mantle//TopBanner';

import ConnectedUs from './mantle/ConnectedUs';
import Footer from './mantle/Footer';
import BecomeSolidityDeveloper from './mantle/BecomeSolidityDeveloper';
import MantleDeveloperJourney from './mantle/MantleDeveloperJourney';
import WhyMantleUniversity from './mantle/WhyMantleUniversity';
import StillNotSure from './mantle/StillNotSure';

const Landing: NextPage<any> = (props) => {
  return (
    <>
      <div className="flex w-screen flex-col justify-center gap-20 bg-black font-GT-Walsheim-Trial">
        <TopBanner />
        <BecomeSolidityDeveloper />
        <MantleDeveloperJourney />
        <WhyMantleUniversity />
        <StillNotSure />
        {/* <CollaborateList /> */}
        {/* <CertificatesIntroduce /> */}
        {/* <BecomeWeb3 /> */}
        {/* <CommunityIntroduction /> */}
        {/* <UserEvaluation /> */}
        {/* <FAQS /> */}
        <div>
          <ConnectedUs />
          <Footer />
        </div>
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
