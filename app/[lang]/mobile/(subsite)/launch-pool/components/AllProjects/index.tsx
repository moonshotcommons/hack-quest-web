import { Lang, TransNs } from '@/i18n/config';
import { FC } from 'react';
import ProjectCard, { ProjectStatus } from './ProjectCard';
import { useTranslation } from '@/i18n/server';

interface AllProjectsProps {
  lang: Lang;
}

const AllProjects: FC<AllProjectsProps> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="container mx-auto px-5 py-10">
      <h2 className="text-h2 mb-10 text-center text-neutral-black">
        {t('allProjects')}
      </h2>
      <div className="flex flex-col gap-5">
        <ProjectCard
          status={ProjectStatus.UPCOMING}
          lang={lang}
          title="Web3.0 Programing For Everyone"
        />
        <ProjectCard
          status={ProjectStatus.LIVE_NOW}
          lang={lang}
          title="Web3.0 Programing For Everyone"
        />
        <ProjectCard
          status={ProjectStatus.CLOSED}
          lang={lang}
          title="Web3.0 Programing For Everyone"
        />
      </div>
    </div>
  );
};

export default AllProjects;
