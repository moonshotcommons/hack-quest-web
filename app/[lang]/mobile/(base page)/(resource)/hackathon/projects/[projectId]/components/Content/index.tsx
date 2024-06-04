import React from 'react';
import { HackathonType, ProjectRankType, ProjectType } from '@/service/webApi/resourceStation/type';
import Overview from './Overview';
import Videos from './Videos';
import Introduction from './Introduction';
import Team from './Team';
import Voting from './Voting';

interface ContentProp {
  project: ProjectType;
  rankInfo: ProjectRankType;
  hackathon: HackathonType;
  isShowVoting: boolean;
}

const Content: React.FC<ContentProp> = ({ project, rankInfo, hackathon, isShowVoting }) => {
  return (
    <div className="body-s flex flex-col gap-[3.75rem] text-neutral-off-black">
      <Overview project={project} hackathon={hackathon} />
      {isShowVoting && <Voting project={project} rankInfo={rankInfo} hackathon={hackathon} />}
      <Videos project={project} />
      <Introduction project={project} />
      <Team project={project} />
    </div>
  );
};

export default Content;
