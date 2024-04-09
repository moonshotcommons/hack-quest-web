import React from 'react';

import PageRetentionTime from '@/components/Common/PageRetentionTime';
import { Metadata } from 'next';
import Dashboard from './components';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'Dashboard',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/dashboard`
    }
  };
}

const DashboardPage = (props: { params: { lang: string } }) => {
  return (
    <div className="h-full w-full">
      <Dashboard />
      <PageRetentionTime trackName="dashboard-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default DashboardPage;
