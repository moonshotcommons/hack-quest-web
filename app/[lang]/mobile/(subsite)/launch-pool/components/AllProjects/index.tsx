import { Lang } from '@/i18n/config';
import { FC } from 'react';
import ProjectCard, { ProjectStatus } from './ProjectCard';

interface AllProjectsProps {
  lang: Lang;
}

const AllProjects: FC<AllProjectsProps> = ({ lang }) => {
  return (
    <div className="container mx-auto mt-5 py-20 ">
      <h2 className="text-h2 mb-20 text-center text-neutral-black">
        All Projects
      </h2>
      <ProjectCard
        status={ProjectStatus.CLOSED}
        lang={lang}
        title="Web3.0 Programing For Everyone"
      />
    </div>
  );
};

export default AllProjects;
