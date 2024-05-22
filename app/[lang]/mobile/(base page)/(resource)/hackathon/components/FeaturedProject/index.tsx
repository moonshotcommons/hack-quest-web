'use client';
import MenuLink from '@/constants/MenuLink';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import { FC, useContext, useMemo } from 'react';
import MobProjectCard from '@/components/Mobile/MobProjectCard';
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
  const list = useMemo(() => {
    return projectList.length <= 16 ? projectList : projectList.slice(0, 16);
  }, [projectList]);
  return (
    <SliderCard
      title={t(title)}
      viewLink={project?.id ? `${MenuLink.PROJECTS}?keyword=${project.hackathonName}` : `${MenuLink.PROJECTS}`}
      isMobile={true}
      renderItem={(contarinerWidth) => {
        return list.map((item) => (
          <div
            key={item.id}
            style={{
              width: `${contarinerWidth}px`
            }}
          >
            <MobProjectCard project={item} />
          </div>
        ));
      }}
    />
  );
};

export default FeaturedProjects;
