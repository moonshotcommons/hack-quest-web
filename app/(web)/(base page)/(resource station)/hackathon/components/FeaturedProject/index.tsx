'use client';
import {
  ChangeState,
  ScrollContainer,
  ScrollControl
} from '@/components/Common/ScrollContainer';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import ProjectCard from '@/components/Web/Business/ProjectCard';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { BurialPoint } from '@/helper/burialPoint';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import { FC, useState } from 'react';
import { LuChevronRight } from 'react-icons/lu';

interface FeaturedProjectsProps {
  projects: ProjectType[];
}

const FeaturedProjectsHeader = () => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-[15px]">
        <h2 className="font-next-poster-Bold text-[28px] tracking-[1.68px] text-[#000]">
          Featured Projects
        </h2>
      </div>
      <Link
        href={`${MenuLink.PROJECTS}?menu=${Menu.HACKATHON}&${QueryIdType.PROJECT_ID}=projects`}
        className="flex gap-x-[15px] items-center text-[#0B0B0B] hover:opacity-70 font-next-book tracking-[0.36px] text-[18px]"
        onClick={() => {
          BurialPoint.track('home-view all点击');
        }}
      >
        <span>View All</span>
        <LuChevronRight size={32}></LuChevronRight>
      </Link>
    </div>
  );
};

const FeaturedProjects: FC<FeaturedProjectsProps> = ({ projects }) => {
  const [scrollContainerState, setScrollContainerState] =
    useState<ChangeState>();

  return (
    <div className="w-full bg-[#FFF4CE] py-[60px]">
      <div className="container mx-auto">
        <FeaturedProjectsHeader></FeaturedProjectsHeader>
        <div>
          <ScrollContainer
            onChange={(state: any) => setScrollContainerState(state)}
            gap={20}
          >
            <div className="my-[30px] flex gap-[20px] overflow-x-hidden">
              {projects.map((project, index) => {
                return (
                  <ProjectCard key={index} project={project}></ProjectCard>
                );
              })}
            </div>
          </ScrollContainer>
          <ScrollControl changeState={scrollContainerState}></ScrollControl>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjects;
