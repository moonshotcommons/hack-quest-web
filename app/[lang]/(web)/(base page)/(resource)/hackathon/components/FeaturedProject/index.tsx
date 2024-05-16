'use client';
import ProjectCard from '@/components/Web/Business/ProjectCard';
import MenuLink from '@/constants/MenuLink';
import { BurialPoint } from '@/helper/burialPoint';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import { FC, useRef, useState, useContext } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import ScrollControl from '../../../blog/components/ScrollControl';
import { ChangeState, ScrollContainer } from '@/components/Common/ScrollContainer';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface FeaturedProjectsProps {
  projectList: ProjectType[];
  title?: string;
  project?: ProjectType;
}

const FeaturedProjects: FC<FeaturedProjectsProps> = ({ projectList, title, project }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [scrollContainerState, setScrollContainerState] = useState<ChangeState>();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="w-full bg-[#FFF4CE] py-[60px]">
      <div className="container mx-auto" ref={containerRef}>
        <div className="flex justify-between">
          <div className="flex flex-col gap-[15px]">
            <h2 className="text-h3 font-next-book-bold text-neutral-black">{t(title || 'featuredProjects')}</h2>
          </div>
          <Link
            href={project?.id ? `${MenuLink.PROJECTS}?keyword=${project.hackathonName}` : `${MenuLink.PROJECTS}`}
            className="body-l flex items-center gap-x-[7px] text-neutral-off-black hover:opacity-70"
            onClick={() => {
              BurialPoint.track('home-view all点击');
            }}
          >
            <span>{t('viewAll')}</span>
            <BsArrowRight size={16}></BsArrowRight>
          </Link>
        </div>
        <div>
          <ScrollContainer ref={scrollContainerRef} onChange={(state: any) => setScrollContainerState(state)}>
            <div className="mt-[30px] flex ">
              {projectList.map((project) => (
                <div
                  key={project.id}
                  className="p-[10px]"
                  style={{
                    width: `calc((${containerRef.current?.offsetWidth}px)/4)`
                  }}
                >
                  <ProjectCard project={project}></ProjectCard>
                </div>
              ))}
            </div>
          </ScrollContainer>
          <div className="mt-[30px]">
            <ScrollControl changeState={scrollContainerState}></ScrollControl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjects;
