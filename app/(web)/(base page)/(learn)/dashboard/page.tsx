import React from 'react';

import PageRetentionTime from '@/components/Common/PageRetentionTime';
import { Metadata } from 'next';
import Dashboard from './components';

export const metadata: Metadata = {
  title: 'Dashboard'
};

const DashboardPage = () => {
  return (
    <div className="container mx-auto pt-[40px] pb-[30px]">
      <Dashboard />
      <PageRetentionTime trackName="home-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default DashboardPage;
