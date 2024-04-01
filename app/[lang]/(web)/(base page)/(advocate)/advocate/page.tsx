import { FC } from 'react';
import TopBanner from './components/TopBanner';
import DataStatistics from './components/DataStatistics';
import CommunityIRL from './components/CommunityIRL';
import DifferenceAdvocate from './components/DifferenceAdvocate';
import AdvocateBenefits from './components/AdvocateBenefits';
import UserEvaluation from './components/UserEvaluation';
import ApplyAdvocate from './components/ApplyAdvocate';
import FAQS from './components/FAQS';
import Footer from './components/Footer';
import ConnectedUs from './components/ConnectedUs';
import { Metadata } from 'next';
interface AdvocatePageProps {}

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'HackQuest Advocate',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/advocate`
    }
  };
}

const AdvocatePage: FC<AdvocatePageProps> = (props) => {
  return (
    <div className="w-full">
      <TopBanner />
      <DataStatistics />
      <CommunityIRL />
      <DifferenceAdvocate />
      <AdvocateBenefits />
      <UserEvaluation />
      <ApplyAdvocate />
      <FAQS />
      <ConnectedUs />
      <Footer />
    </div>
  );
};

export default AdvocatePage;
