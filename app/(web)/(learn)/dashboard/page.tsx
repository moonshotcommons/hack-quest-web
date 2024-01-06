import LearningCourses from './components/LearningCourses';
import React from 'react';

import PageRetentionTime from '@/components/Common/PageRetentionTime';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard'
};

const DashboardPage = () => {
  return (
    <div className="">
      <LearningCourses />
      <PageRetentionTime trackName="home-页面留存时间"></PageRetentionTime>
      {/* <FeatureCourses></FeatureCourses> */}
    </div>
  );
};

export default DashboardPage;
