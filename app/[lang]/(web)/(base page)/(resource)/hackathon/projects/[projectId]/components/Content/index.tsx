import React, { useContext, useEffect, useRef } from 'react';
import { OffsetTopsType, ProjectDetailContext } from '../../../../constants/type';
import { HackathonType, ProjectRankType, ProjectType } from '@/service/webApi/resourceStation/type';
import Overview from './Overview';
import Videos from './Videos';
import Introduction from './Introduction';
import Team from './Team';
import Voting from './Voting';

interface ContentProp {
  setOffsetTop: (tops: OffsetTopsType[]) => void;
  project: ProjectType;
  rankInfo: ProjectRankType;
  hackathon: HackathonType;
  isShowVoting: boolean;
}

const Content: React.FC<ContentProp> = ({ setOffsetTop, project, rankInfo, hackathon, isShowVoting }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const { titleTxtData } = useContext(ProjectDetailContext);
  const getOffsetTops = () => {
    const offsetTops = [];
    const childNodes = boxRef.current?.childNodes || [];
    for (let i = 0; i < childNodes?.length; i++) {
      const offsetTop = (childNodes[i] as HTMLDivElement).offsetTop || 0;
      offsetTops.push({
        title: `${titleTxtData[i]}`,
        offsetTop: offsetTop
      });
    }
    setOffsetTop(offsetTops);
  };

  useEffect(() => {
    getOffsetTops();
  }, [project, isShowVoting]);
  return (
    <div className="body-m flex flex-1 flex-shrink-0 flex-col gap-[60px] text-neutral-off-black" ref={boxRef}>
      <Overview project={project} hackathon={hackathon} />
      {isShowVoting && <Voting project={project} rankInfo={rankInfo} hackathon={hackathon} />}
      <Videos project={project} />
      <Introduction project={project} />
      <Team project={project} />
    </div>
  );
};

export default Content;
