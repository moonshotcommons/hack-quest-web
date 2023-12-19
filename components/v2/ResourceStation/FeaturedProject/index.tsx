import {
  ChangeState,
  ScrollContainer
} from '@/components/v2/Common/ScrollContainer';
import { menuLink } from '@/components/v2/Business/Breadcrumb/data';
import { Menu, QueryIdType } from '@/components/v2/Business/Breadcrumb/type';
import ProjectCard from '@/components/v2/Business/ProjectCard';
import { BurialPoint } from '@/helper/burialPoint';
import webApi from '@/service';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import { useRequest } from 'ahooks';
import Link from 'next/link';
import { FC, useState } from 'react';
import { LuChevronRight } from 'react-icons/lu';
import ScrollControl from './ScrollControl';
interface FeatureProjectsProps {
  ignoreProjectId?: string;
}

const FeatureProjectsHeader = () => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-[15px]">
        <h2 className="font-next-poster-Bold text-[28px] tracking-[1.68px] text-[#000]">
          Featured Projects
        </h2>
      </div>
      <Link
        href={`${menuLink.projects}/projects?menu=${Menu.PROJECTS}&${QueryIdType.PROJECT_ID}=projects`}
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
  const [projectList, setProjectList] = useState<ProjectType[]>([]);
  const [scrollContainerState, setScrollContainerState] =
    useState<ChangeState>();

  const { run, loading } = useRequest(
    async () => {
      const res = await webApi.resourceStationApi.getProjectsList({
        featured: true
      });
      return res;
    },
    {
      onSuccess(projects) {
        if (props.ignoreProjectId) {
          setProjectList(
            projects.data.filter(
              (project) => project.id !== props.ignoreProjectId
            )
          );
        } else setProjectList(projects.data);
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
