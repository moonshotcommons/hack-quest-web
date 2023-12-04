import JoinUs from '@/components/Mantle/Landing/JoinUs';
import HackQuestInfo from '@/components/Mantle/Landing/HackQuestInfo';
import HomeBanner from '@/components/Mantle/Landing/HomeBanner';
import JoinUsImage from '@/public/images/mantle/mantle_join.png';
import { BurialPoint } from '@/helper/burialPoint';
import { NextPage } from 'next';
import { useEffect } from 'react';
import Image from 'next/image';
import Footer from '@/components/Mantle/Landing/Footer';
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
    <div className="flex flex-col justify-center">
      <HomeBanner></HomeBanner>
      <HackQuestInfo></HackQuestInfo>
      <div className="mx-auto container my-[80px] flex justify-center">
        <JoinUs></JoinUs>
      </div>
      <Footer></Footer>
    </div>
  );
};

Landing.displayName = 'Landing';

// Landing.getInitialProps = (context) => {
//   return {};
// };

export default Landing;
