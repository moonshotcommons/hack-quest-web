'use client';
import LearningCourses from '@/components/v2/Home/LearningCourses';
import React, { useEffect } from 'react';

import Title from '@/components/v1/Head/Title';
import FeatureCourses from '@/components/v2/Home/FeaturedCourses';
import { BurialPoint } from '@/helper/burialPoint';

const Home = () => {
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
      <Title title="Dashboard" />
      <LearningCourses />
      <FeatureCourses></FeatureCourses>
    </div>
  );
};

export default Home;
