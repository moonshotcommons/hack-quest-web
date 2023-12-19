'use client';
import { BurialPoint } from '@/helper/burialPoint';
import { NextPage } from 'next';
import { useEffect } from 'react';

const Landing: NextPage<any> = (props) => {
  useEffect(() => {
    const startTime = new Date().getTime();
    return () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      BurialPoint.track('landing-页面留存时间', { duration });
    };
  }, []);
  return (
    <div className="flex flex-col justify-center bg-landing-hack-info-bg ">
      {/* <HomeBanner></HomeBanner>
      <HackQuestInfo></HackQuestInfo>
      <div className="mx-auto container slab:w-full slab:px-[20px] py-[150px] slab:py-[80px] flex justify-center">
        <JoinUs></JoinUs>
      </div> */}
      移动端
    </div>
  );
};

Landing.displayName = 'Landing';

// Landing.getInitialProps = (context) => {
//   return {};
// };

export default Landing;
