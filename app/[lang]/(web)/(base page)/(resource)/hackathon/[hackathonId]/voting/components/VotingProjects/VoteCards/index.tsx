import { ProjectType } from '@/service/webApi/resourceStation/type';
import React, { useContext } from 'react';
import AgendaCard from './AgendaCard';
import GridCard from './GridCard';
import CalendarCard from './CalendarCard';
import { HackathonVoteContext, ViewValue } from '../../../../../constants/type';

interface VoteCardsProp {
  projects: ProjectType[];
}

const VoteCards: React.FC<VoteCardsProp> = ({ projects }) => {
  const { view } = useContext(HackathonVoteContext);
  switch (view) {
    case ViewValue.AGENDA:
      return (
        <div className="flex w-full flex-col gap-[32px]">
          {projects.map((project) => (
            <div className="w-full" key={project.id}>
              <AgendaCard project={project} />
            </div>
          ))}
        </div>
      );
    case ViewValue.GRID:
      return (
        <div className="flex w-full flex-wrap gap-[20px]">
          {projects.map((project) => (
            <div className="w-[calc((100%-40px)/3)]" key={project.id}>
              <GridCard project={project} />
            </div>
          ))}
        </div>
      );
    default:
      return (
        <div className="flex w-full flex-wrap gap-[20px]">
          {projects.map((project) => (
            <div className="w-[calc((100%-40px)/3)]" key={project.id}>
              <CalendarCard project={project} />
            </div>
          ))}
        </div>
      );
  }
};

export default VoteCards;
