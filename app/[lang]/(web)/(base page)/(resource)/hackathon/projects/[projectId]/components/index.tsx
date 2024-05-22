'use client';
import { HackathonType, ProjectRankType, ProjectType } from '@/service/webApi/resourceStation/type';
import React, { useMemo, useRef, useState } from 'react';
import Nav from './Nav';
import Content from './Content';
import { OffsetTopsType } from '../../../constants/type';
import FeaturedProjects from '../../../components/FeaturedProject';
import ProjectProvider from './ProjectProvider';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import CloseIn from './CloseIn';
import dayjs from '@/components/Common/Dayjs';

interface ProjectDetailProp {
  project: ProjectType;
  projectList: ProjectType[];
}

const ProjectDetail: React.FC<ProjectDetailProp> = ({ project, projectList }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [curAnchorIndex, setCurAnchorIndex] = useState(0);
  const [offsetTops, setOffsetTops] = useState<OffsetTopsType[]>([]);
  const isOnScoll = useRef(false);
  const timeOut = useRef<NodeJS.Timeout | null>(null);
  const [hackathon, setHackathon] = useState<HackathonType>();
  const [rankInfo, setRankInfo] = useState<ProjectRankType>();
  const handleClickAnchor = (index: number) => {
    setCurAnchorIndex(index);
    isOnScoll.current = true;
    boxRef.current?.scrollTo({
      top: offsetTops[index]?.offsetTop || 0
    });
    setTimeout(() => {
      isOnScoll.current = false;
    }, 10);
  };
  const handleScoll = () => {
    if (isOnScoll.current) return;
    const scrollTop = boxRef.current?.scrollTop || 0;
    timeOut.current = setTimeout(() => {
      timeOut.current = null;
      for (let i = 0; i < offsetTops.length; i++) {
        if (scrollTop >= offsetTops[offsetTops.length - 1].offsetTop) {
          setCurAnchorIndex(offsetTops.length - 1);
          break;
        } else if (scrollTop >= offsetTops[i].offsetTop && scrollTop < offsetTops[i + 1].offsetTop) {
          setCurAnchorIndex(i);
          break;
        }
      }
    }, 150);
  };

  const { run: getRankInfo } = useRequest(
    async () => {
      const res = await webApi.resourceStationApi.getProjectsRankInfo(project.id);
      return res;
    },
    {
      onSuccess(res) {
        setRankInfo(res);
      }
    }
  );

  const { run: getHackathonInfo } = useRequest(
    async () => {
      const res = await webApi.resourceStationApi.getHackathonDetail(project.hackathonId);
      return res;
    },
    {
      onSuccess(res) {
        setHackathon(res);
      }
    }
  );
  const isShowVoting = useMemo(() => {
    const isEnd = dayjs().tz().isAfter(hackathon?.rewardTime);
    return !!(((isEnd && project.vote) || !isEnd) && project.isSubmit);
  }, [hackathon, project]);

  return (
    <div className="scroll-wrap-y h-full bg-neutral-off-white" ref={boxRef} onScroll={handleScoll}>
      <div className="container  relative mx-auto pt-[20px]">
        <CloseIn project={project} hackathon={hackathon as HackathonType} rankInfo={rankInfo as ProjectRankType} />
        <ProjectProvider isShowVoting={isShowVoting}>
          <div className="relative mt-[40px] flex">
            <div className="relative">
              <Nav curAnchorIndex={curAnchorIndex} offsetTops={offsetTops} handleClickAnchor={handleClickAnchor} />
            </div>
            <Content
              setOffsetTop={(tops: OffsetTopsType[]) => setOffsetTops(tops)}
              project={project}
              hackathon={hackathon as HackathonType}
              rankInfo={rankInfo as ProjectRankType}
              isShowVoting={isShowVoting}
            />
          </div>
        </ProjectProvider>
      </div>
      <div className="mt-[80px]">
        <FeaturedProjects
          projectList={projectList}
          project={project}
          title={'projectsDetail.otherProjects'}
        ></FeaturedProjects>
      </div>
    </div>
  );
};

export default ProjectDetail;
