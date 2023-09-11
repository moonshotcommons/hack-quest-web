import LearningCourses from '@/components/v2/Home/LearningCourses';
import React, { useEffect } from 'react';

import FeatureCourses from '@/components/v2/Home/FeaturedCourses';
import { BurialPoint } from '@/helper/burialPoint';
import { NextPage } from 'next';
interface HomeProps {
  children: React.ReactNode;
}

const Home: NextPage<HomeProps> = (props) => {
  useEffect(() => {
    const startTime = new Date().getTime();
    return () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      BurialPoint.track('home-页面留存时间', { duration });
    };
  }, []);

  return (
    <div className="">
      <LearningCourses />
      <FeatureCourses></FeatureCourses>
    </div>
  );
};

export default Home;
