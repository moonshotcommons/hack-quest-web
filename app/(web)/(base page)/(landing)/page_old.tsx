import JoinUs from './components/JoinUs';
import HackQuestInfo from './components/HackQuestInfo';
import HomeBanner from './components/HomeBanner';
import { NextPage } from 'next';
import PageRetentionTime from '@/components/Common/PageRetentionTime';

const Landing: NextPage<any> = (props) => {
  return (
    <>
      <div className="flex flex-col justify-center bg-landing-hack-info-bg ">
        <HomeBanner></HomeBanner>
        <HackQuestInfo></HackQuestInfo>
        <div className="mx-auto container slab:w-full slab:px-[20px] py-[150px] slab:py-[80px] flex justify-center">
          <JoinUs></JoinUs>
        </div>
      </div>
      <PageRetentionTime trackName="landing-页面留存时间"></PageRetentionTime>
    </>
  );
};

Landing.displayName = 'Landing';

// Landing.getInitialProps = (context) => {
//   return {};
// };

export default Landing;
