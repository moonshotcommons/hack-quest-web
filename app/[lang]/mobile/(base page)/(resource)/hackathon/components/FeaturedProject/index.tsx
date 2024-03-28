'use client';
import MenuLink from '@/constants/MenuLink';
import { BurialPoint } from '@/helper/burialPoint';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import { FC, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import ScrollControl from '../../../blog/components/ScrollControl';
import {
  ChangeState,
  ScrollContainer
} from '@/components/Common/ScrollContainer';
import MobProjectCard from '@/components/Mobile/MobProjectCard';

interface FeaturedProjectsProps {
  projectList: ProjectType[];
}

const FeaturedProjects: FC<FeaturedProjectsProps> = ({ projectList }) => {
  const [scrollContainerState, setScrollContainerState] =
    useState<ChangeState>();
  return (
    <div className="w-full bg-yellow-extra-light px-[1.25rem] py-[1.875rem]">
      <div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-[15px]">
            <h2 className="text-h3-mob text-neutral-off-black">
              Featured Projects
            </h2>
          </div>
          <Link
            href={`${MenuLink.PROJECTS}`}
            className="body-s flex items-center gap-x-[7px] text-neutral-black"
            onClick={() => {
              BurialPoint.track('home-view all点击');
            }}
          >
            <span>View All</span>
            <BsArrowRight size={12}></BsArrowRight>
          </Link>
        </div>
        <ScrollContainer
          onChange={(state: any) => setScrollContainerState(state)}
        >
          <div className="my-[1.875rem] flex overflow-x-hidden">
            {projectList.map((project) => (
              <div
                key={project.id}
                className="w-[calc(100vw-2.5rem)] p-[.25rem]"
              >
                <MobProjectCard
                  key={project.id}
                  project={project}
                ></MobProjectCard>
              </div>
            ))}
          </div>
        </ScrollContainer>
        <ScrollControl changeState={scrollContainerState}></ScrollControl>
      </div>
    </div>
  );
};

export default FeaturedProjects;
