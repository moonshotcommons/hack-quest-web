import React from 'react';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import HackathonBox from './HackathonBox';
import FeaturedProjects from './FeaturedProject';
import { HackathonStatusType, ProjectType } from '@/service/webApi/resourceStation/type';

interface HackathonProps {
  featured: ProjectType[];
  page: number;
  curTab: HackathonStatusType;
}

function Hackathon({ featured, page, curTab }: HackathonProps) {
  return (
    <div className="text-home-default-color">
      <HackathonBox page={page} curTab={curTab} />
      <FeaturedProjects projectList={featured} />
      <PageRetentionTime trackName="hackathon-页面留存时间" />
    </div>
  );
}

export default Hackathon;
