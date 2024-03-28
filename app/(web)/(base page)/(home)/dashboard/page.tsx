import React from 'react';

import PageRetentionTime from '@/components/Common/PageRetentionTime';
import { Metadata } from 'next';
import Dashboard from './components';

export const metadata: Metadata = {
  title: 'Dashboard',
  alternates: {
    canonical: 'https://www.hackquest.io/dashboard'
  }
};

const DashboardPage = () => {
  return (
    <div className="h-full w-full">
      <Dashboard />
      <PageRetentionTime trackName="dashboard-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default DashboardPage;
