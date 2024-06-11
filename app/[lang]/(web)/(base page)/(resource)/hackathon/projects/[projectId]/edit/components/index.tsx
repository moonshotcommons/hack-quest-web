'use client';
import { HackathonType, ProjectType } from '@/service/webApi/resourceStation/type';
import React, { useMemo, useRef, useState } from 'react';
import dayjs from '@/components/Common/Dayjs';
// import Content from './Content';

import CloseIn from './CloseIn';
import { OffsetTopsType } from '../../../../constants/type';
import Content from './Content';

interface ProjectDetailProp {
  project: ProjectType;
  hackathon: HackathonType;
}

const ProjectDetail: React.FC<ProjectDetailProp> = ({ project, hackathon }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [curAnchorIndex, setCurAnchorIndex] = useState(0);
  const [offsetTops, setOffsetTops] = useState<OffsetTopsType[]>([]);
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

  const isClose = useMemo(() => {
    return dayjs().tz().isAfter(hackathon?.reviewTime);
  }, [hackathon]);

  return (
    <div className="scroll-wrap-y h-full bg-neutral-off-white" ref={boxRef} onScroll={handleScoll}>
      <div className="container  relative mx-auto pt-[20px]">
        {hackathon && <CloseIn hackathon={hackathon} isClose={isClose} />}

        <div className="relative mt-[40px] flex">
          <Content
            setOffsetTop={(tops: OffsetTopsType[]) => setOffsetTops(tops)}
            project={project}
            hackathon={hackathon as HackathonType}
            curAnchorIndex={curAnchorIndex}
            offsetTops={offsetTops}
            isClose={isClose}
            handleClickAnchor={handleClickAnchor}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
