import HomeTop from '@/components/v2/Home/Top';
import React from 'react';

import FeatureCourses from '@/components/v2/Home/FeaturedCourses';
import { NextPage } from 'next';
interface HomeProps {
  children: React.ReactNode;
}

const Home: NextPage<HomeProps> = (props) => {
  return (
    <div className="w-full">
      <HomeTop />
      <FeatureCourses></FeatureCourses>
    </div>
  );
};

export default Home;
