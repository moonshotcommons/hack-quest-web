import React from 'react';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import HackathonBox from './HackathonBox';
import FeaturedProjects from './FeaturedProject';
import { ProjectType } from '@/service/webApi/resourceStation/type';

interface HackathonProps {
  featured: ProjectType[];
}

function Hackathon({ featured }: HackathonProps) {
  return (
    <div className=" text-home-default-color">
      <HackathonBox />
      <FeaturedProjects projectList={featured} />
      <PageRetentionTime trackName="hackathon-页面留存时间" />
    </div>
  );
}

export default Hackathon;
