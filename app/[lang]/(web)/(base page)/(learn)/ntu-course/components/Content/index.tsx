import React, { useEffect, useRef } from 'react';
import { OffsetTopsType } from '../../constants/type';
import { titleTxtData } from '../../constants/data';
import Overview from './Overview';
import ClassTime from './ClassTime';
import Enrollment from './Enrollment';
import Syllabus from './Syllabus';
import Speakers from './Speakers';
import Sponsors from './Sponsors';
import CourseDesc from './CourseDesc';

interface ContentProp {
  setOffsetTop: (tops: OffsetTopsType[]) => void;
}

const Content: React.FC<ContentProp> = ({ setOffsetTop }) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const getOffsetTops = () => {
    const offsetTops = [];
    const childNodes = boxRef.current?.childNodes || [];
    for (let i = 0; i < childNodes?.length; i++) {
      const offsetTop = (childNodes[i] as HTMLDivElement).offsetTop || 0;
      offsetTops.push({
        title: `${titleTxtData[i]}`,
        offsetTop: offsetTop - 40
      });
    }
    setOffsetTop(offsetTops);
  };
  useEffect(() => {
    getOffsetTops();
  }, []);
  return (
    <div className="flex flex-col gap-[120px] text-neutral-off-black" ref={boxRef}>
      <Overview />
      <div className="mt-[-80px]">
        <ClassTime />
      </div>
      <Enrollment />
      <Syllabus />
      <Speakers refreshOffsetTop={getOffsetTops} />
      <Sponsors refreshOffsetTop={getOffsetTops} />
      <CourseDesc />
    </div>
  );
};

export default Content;
