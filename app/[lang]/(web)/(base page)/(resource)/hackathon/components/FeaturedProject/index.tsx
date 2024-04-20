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
}

const FeaturedProjectsHeader = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-[15px]">
        <h2 className="text-h3 font-next-book-bold text-neutral-black">{t('featuredProjects')}</h2>
      </div>
      <Link
        href={`${MenuLink.PROJECTS}`}
        className="body-l flex items-center gap-x-[7px] text-neutral-off-black hover:opacity-70"
        onClick={() => {
          BurialPoint.track('home-view all点击');
        }}
      >
        <span>{t('viewAll')}</span>
        <BsArrowRight size={16}></BsArrowRight>
      </Link>
    </div>
  );
};

const FeaturedProjects: FC<FeaturedProjectsProps> = ({ projectList }) => {
  const [scrollContainerState, setScrollContainerState] = useState<ChangeState>();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="w-full bg-[#FFF4CE] py-[60px]">
      <div className="container mx-auto" ref={containerRef}>
        <FeaturedProjectsHeader></FeaturedProjectsHeader>
        <div>
          <ScrollContainer ref={scrollContainerRef} gap={20} onChange={(state: any) => setScrollContainerState(state)}>
            <div className="mt-[30px] flex gap-[20px]">
              {projectList.map((project) => (
                <div
                  key={project.id}
                  className="p-[2px]"
                  style={{
                    width: `calc((${containerRef.current?.offsetWidth}px - 60px)/4)`
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
