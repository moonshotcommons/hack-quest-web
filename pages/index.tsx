import JoinUs from '@/components/v2/Landing/JoinUs';
import HackQuestInfo from '@/components/v2/Landing/HackQuestInfo';
import HomeBanner from '@/components/v2/Landing/HomeBanner';
import { BurialPoint } from '@/helper/burialPoint';
import { NextPage } from 'next';
import { useEffect } from 'react';
const Landing: NextPage<any> = (props) => {
  // const { nowCards, syntaxCards, tracksCards } = props;
  useEffect(() => {
    const startTime = new Date().getTime();
    return () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      BurialPoint.track('landing-页面留存时间', { duration });
    };
  }, []);
  return (
    <div className="flex  flex-col justify-center">
      <HomeBanner></HomeBanner>
      <HackQuestInfo></HackQuestInfo>
      <div className="mx-auto container py-[150px] flex justify-center">
        <JoinUs></JoinUs>
      </div>
    </div>
  );
};

Landing.displayName = 'Landing';

// Landing.getInitialProps = (context) => {
//   return {};
// };

export default Landing;
