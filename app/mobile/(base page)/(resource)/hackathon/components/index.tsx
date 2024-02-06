import React from 'react';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import { Metadata } from 'next';
import HackathonBox from './HackathonBox';
import FeaturedProjects from './FeaturedProject';

export const metadata: Metadata = {
  title: 'Hackathons'
};

function Hackathon() {
  return (
    <div className=" text-home-default-color">
      <HackathonBox />
      <FeaturedProjects />
      <PageRetentionTime trackName="hackathon-页面留存时间" />
    </div>
  );
}

export default Hackathon;
