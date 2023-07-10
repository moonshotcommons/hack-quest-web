import { NextPage } from 'next';
import PeopleJoined from '@/components/Common/PeopleJoined';
import { getRandomPeopleAvatars } from '@/helper/random';
import RightIcon from '@/components/Common/Icon/Right';
import SkipIcon from '@/components/Common/Icon/Skip';
import Image from 'next/image';
import BannerBg from '@/public/images/home/landing-back.png';
import HomeBanner from '@/components/Home/HomeBanner';
import { useState } from 'react';
import BottomIcon from '@/components/Common/Icon/Bottom';
import HomeCourseTab from '@/components/Home/HomeCoursesTab';

import Link from 'next/link';
import HackQuestInfo from '@/components/Home/HackQuestInfo';
import JoinUs from '@/components/Home/JoinUs';
const Landing: NextPage<any> = (props) => {
  // const { nowCards, syntaxCards, tracksCards } = props;

  return (
    <div className="flex  flex-col justify-center">
      <HomeBanner></HomeBanner>
      <HomeCourseTab></HomeCourseTab>
      <HackQuestInfo></HackQuestInfo>
      <div className="mt-[21.81rem]">
        <JoinUs></JoinUs>
      </div>
    </div>
  );
};

Landing.displayName = 'Courses';

// Landing.getInitialProps = (context) => {
//   return {};
// };

export default Landing;
