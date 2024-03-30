'use client';
import { FC } from 'react';
import { useNeedPCRedirect } from '@/hooks/router/useNeedPCRedirect';
interface AdvocatePageProps {}

// export const metadata: Metadata = {
//   alternates: {
//     canonical: 'https://www.hackquest.io/advocate'
//   }
// };

const AdvocatePage: FC<AdvocatePageProps> = (props) => {
  useNeedPCRedirect();
  return (
    <div className="w-full">
      {/* <TopBanner />
      <DataStatistics />
      <CommunityIRL />
      <DifferenceAdvocate />
      <AdvocateBenefits />
      <UserEvaluation />
      <ApplyAdvocate />
      <FAQS />
      <ConnectedUs />
      <Footer /> */}
    </div>
  );
};

export default AdvocatePage;
