import React, { useContext, useEffect, useRef } from 'react';
import { OffsetTopsType, ProjectDetailContext } from '../../../../constants/type';
import Overview from './Overview';
import Videos from './Videos';
import Introduction from './Introduction';
import Team from './Team';
import Voting from './Voting';

interface ContentProp {
  setOffsetTop: (tops: OffsetTopsType[]) => void;
}

const Content: React.FC<ContentProp> = ({ setOffsetTop }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const { project, titleTxtData, isShowVoting } = useContext(ProjectDetailContext);
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
    setTimeout(() => {
      getOffsetTops();
    }, 1000);
  }, [project, isShowVoting]);
  return (
    <div className="body-m flex flex-1 flex-shrink-0 flex-col gap-[60px] text-neutral-off-black" ref={boxRef}>
      <Overview />
      <Voting />
      <Videos />
      <Introduction />
      <Team />
    </div>
  );
};

export default Content;
