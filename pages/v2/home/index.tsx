import LearningCourses from '@/components/v2/Home/LearningCourses';
import React from 'react';

import FeatureCourses from '@/components/v2/Home/FeaturedCourses';
import { NextPage } from 'next';
interface HomeProps {
  children: React.ReactNode;
}

const Home: NextPage<HomeProps> = (props) => {
  return (
    <div className="">
      <LearningCourses />
      <FeatureCourses></FeatureCourses>
    </div>
  );
};

export default Home;
