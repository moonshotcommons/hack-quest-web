import {
  ChangeState,
  ScrollContainer
} from '@/components/Common/ScrollContainer';
import { BurialPoint } from '@/helper/burialPoint';
import webApi from '@/service';
import { CourseResponse } from '@/service/webApi/course/type';
import { useRequest } from 'ahooks';
import Link from 'next/link';
import { FC, useState } from 'react';
import { LuChevronRight } from 'react-icons/lu';
import CourseCard from '../../CourseCard';
import ScrollControl from './ScrollControl';
import ProjectCard from '../../ProjectCard';
import { ProjectDetail } from '@/service/webApi/resourceStation/project/type';
interface FeatureProjectsProps {}

const FeatureProjectsHeader = () => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-[15px]">
        <h2 className="font-next-poster-Bold text-[28px] tracking-[1.68px] text-[#000]">
          Featured Projects
        </h2>
        <p className="w-[540px] text-[14px] leading-[160%] font-next-book text-[#000]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <Link
        href={'/resource-station/hackathon/projects'}
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

const FeatureProjects: FC<FeatureProjectsProps> = (props) => {
  const [projectList, setProjectList] = useState<ProjectDetail[]>([]);
  const [scrollContainerState, setScrollContainerState] =
    useState<ChangeState>();

  const { run, loading } = useRequest(
    async () => {
      const res = await webApi.project.getFeaturedProjects();
      return res;
    },
    {
      onSuccess(projects) {
        setProjectList(projects.data);
      },
      onError(error: any) {
        console.log(error);
        // message.error(error.msg);
      }
    }
  );

  return (
    <div className="w-full bg-[#FFF4CE] py-[60px]">
      <div className="container mx-auto">
        <FeatureProjectsHeader></FeatureProjectsHeader>
        <div>
          <ScrollContainer
            onChange={(state: any) => setScrollContainerState(state)}
          >
            <div className="my-[30px] flex gap-[20px] overflow-x-hidden">
              {projectList.map((project, index) => {
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

export default FeatureProjects;
