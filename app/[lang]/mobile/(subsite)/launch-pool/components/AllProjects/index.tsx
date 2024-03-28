import { Lang, TransNs } from '@/i18n/config';
import { FC } from 'react';
import ProjectCard from './ProjectCard';
import { useTranslation } from '@/i18n/server';
import { LaunchPoolProjectType } from '@/service/webApi/launchPool/type';

interface AllProjectsProps {
  lang: Lang;
  projects: LaunchPoolProjectType[];
}

const AllProjects: FC<AllProjectsProps> = async ({ lang, projects }) => {
  const { t } = await useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="container mx-auto px-5 py-10">
      <h2 className="text-h2 mb-10 text-center text-neutral-black">{t('allProjects')}</h2>
      <div className="flex flex-col gap-5">
        {projects.map((project) => {
          return <ProjectCard key={project.id} lang={lang} project={project} />;
        })}
      </div>
    </div>
  );
};

export default AllProjects;
