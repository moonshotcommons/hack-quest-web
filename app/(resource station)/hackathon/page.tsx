import React from 'react';
import HackathonBox from '@/components/v2/ResourceStation/HackathonBox';
import FeatureProject from '@/components/v2/ResourceStation/FeaturedProject';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hackathons'
};

function Hackathon() {
  return (
    <div className="font-next-book text-home-default-color">
      <HackathonBox />
      <FeatureProject />
      <PageRetentionTime trackName="hackathon-页面留存时间" />
    </div>
  );
}

export default Hackathon;
