import React from 'react';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import HackathonBox from './HackathonBox';
import FeaturedProjects from './FeaturedProject';
import { HackathonStatusType, HackathonType, ProjectType } from '@/service/webApi/resourceStation/type';

interface HackathonProps {
  featured: ProjectType[];
  page: number;
  curTab: HackathonStatusType;
  hackathonList: HackathonType[];
  miniHackathonList: HackathonType[];
  total: number;
  limit: number;
}
const Hackathon: React.FC<HackathonProps> = ({
  featured,
  page,
  curTab,
  hackathonList,
  total,
  limit,
  miniHackathonList
}) => {
  return (
    <div className="text-home-default-color">
      <HackathonBox
        page={page}
        curTab={curTab}
        hackathonList={hackathonList}
        total={total}
        limit={limit}
        miniHackathonList={miniHackathonList}
      />
      <FeaturedProjects projectList={featured} />
      <PageRetentionTime trackName="hackathon-页面留存时间" />
    </div>
  );
};

export default Hackathon;
