'use client';
import { HackathonType, ProjectType, ProjectVotesType } from '@/service/webApi/resourceStation/type';
import React, { useRef, useState } from 'react';
import Nav from './Nav';
import Content from './Content';
import { OffsetTopsType } from '../../../constants/type';
import FeaturedProjects from '../../../components/FeaturedProject';
import ProjectProvider from './ProjectProvider';
import CloseIn from './CloseIn';

interface ProjectDetailProp {
  project: ProjectType;
  otherProjects: ProjectType[];
  hackathon: HackathonType;
  projectVote: ProjectVotesType;
}

const ProjectDetail: React.FC<ProjectDetailProp> = ({ project, otherProjects, hackathon, projectVote }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [offsetTops, setOffsetTops] = useState<OffsetTopsType[]>([]);
  const [curAnchorIndex, setCurAnchorIndex] = useState(0);
  const isOnScoll = useRef(false);
  const timeOut = useRef<NodeJS.Timeout | null>(null);
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

  return (
    <ProjectProvider project={project} hackathon={hackathon} projectVote={projectVote}>
      <div className="scroll-wrap-y h-full bg-neutral-off-white" ref={boxRef} onScroll={handleScoll}>
        <div className="container  relative mx-auto pt-[20px]">
          <CloseIn />
          <div className="relative mt-[40px] flex">
            <div className="relative">
              <Nav curAnchorIndex={curAnchorIndex} offsetTops={offsetTops} handleClickAnchor={handleClickAnchor} />
            </div>
            <Content setOffsetTop={(tops: OffsetTopsType[]) => setOffsetTops(tops)} />
          </div>
        </div>
        <div className="mt-[80px]">
          <FeaturedProjects
            projectList={otherProjects}
            project={project}
            title={'projectsDetail.otherProjects'}
          ></FeaturedProjects>
        </div>
      </div>
    </ProjectProvider>
  );
};

export default ProjectDetail;
