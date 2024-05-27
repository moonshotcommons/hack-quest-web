import { ProjectType } from '@/service/webApi/resourceStation/type';
import React, { useContext } from 'react';
import AgendaCard from './AgendaCard';
import CalendarCard from './CalendarCard';
import { HackathonVoteContext, ViewValue } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';

interface VoteCardsProp {
  projects: ProjectType[];
}

const VoteCards: React.FC<VoteCardsProp> = ({ projects }) => {
  const { view } = useContext(HackathonVoteContext);
  switch (view) {
    case ViewValue.AGENDA:
      return (
        <div className="flex w-full flex-col gap-[1.5rem]">
          {projects.map((project) => (
            <div className="w-full" key={project.id}>
              <AgendaCard project={project} />
            </div>
          ))}
        </div>
      );
    default:
      return (
        <div className="flex w-full flex-wrap gap-[.75rem]">
          {projects.map((project) => (
            <div className="w-full" key={project.id}>
              <CalendarCard project={project} />
            </div>
          ))}
        </div>
      );
  }
};

export default VoteCards;
