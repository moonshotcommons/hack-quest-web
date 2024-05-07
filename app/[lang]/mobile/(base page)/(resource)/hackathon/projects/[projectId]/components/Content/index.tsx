import React from 'react';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import Overview from './Overview';
import Videos from './Videos';
import Introduction from './Introduction';
import Team from './Team';

interface ContentProp {
  project: ProjectType;
}

const Content: React.FC<ContentProp> = ({ project }) => {
  return (
    <div className="body-s flex flex-col gap-[3.75rem] text-neutral-off-black">
      <Overview project={project} />
      <Videos project={project} />
      <Introduction project={project} />
      <Team project={project} />
    </div>
  );
};

export default Content;
