'use client';
import ProjectCard from '@/components/Web/Business/ProjectCard';
import MenuLink from '@/constants/MenuLink';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import { FC, useContext } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import SliderCard from '@/components/Web/Business/SliderCard';

interface FeaturedProjectsProps {
  projectList: ProjectType[];
  title?: string;
  project?: ProjectType;
}

const FeaturedProjects: FC<FeaturedProjectsProps> = ({ projectList, title, project }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="container mx-auto">
      <SliderCard
        title={t(title || 'featuredProjects')}
        viewLink={project?.id ? `${MenuLink.PROJECTS}?keyword=${project.hackathonName}` : `${MenuLink.PROJECTS}`}
        renderItem={(contarinerWidth) => {
          return projectList.map((item) => (
            <div
              key={item.id}
              className={`p-[10px]`}
              style={{
                width: `calc((${contarinerWidth}px)/4)`
              }}
            >
              <ProjectCard project={item} />
            </div>
          ));
        }}
      />
    </div>
  );
};

export default FeaturedProjects;
