'use client';
import React, { useEffect, useRef } from 'react';
import OverView from './OverView';
import TimeLine from './TimeLine';
import YourFuelingBoard from './YourFuelingBoard';
import About from './About';
import DemoVideo from './DemoVideo';
import KeyMetrics from './KeyMetrics';
import Tractions from './Tractions';
import Loading from '@/components/Common/Loading';
import { titleTxtData } from '@/app/[lang]/(web)/(subsite)/launch-pool/[id]/constants/data';

export interface OffsetTopsType {
  title: string;
  offsetTop: number;
}
interface ContentProp {
  loading: boolean;
  setOffsetTop: (tops: OffsetTopsType[]) => void;
}

const Content: React.FC<ContentProp> = ({ loading, setOffsetTop }) => {
  const overViewRef = useRef<HTMLDivElement>(null);
  const timeLineRef = useRef<HTMLDivElement>(null);
  const yourFuelingBoardRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const demoVideoRef = useRef<HTMLDivElement>(null);
  const keyMetricsRef = useRef<HTMLDivElement>(null);
  const tractionsRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const getOffsetTops = () => {
    const offsetTops = [];
    const childNodes = boxRef.current?.childNodes || [];
    for (let i = 0; i < childNodes?.length; i++) {
      const offsetTop = (childNodes[i] as HTMLDivElement).offsetTop || 0;
      offsetTops.push({
        title: `launch-${titleTxtData[i]}`,
        offsetTop: offsetTop
      });
    }
    setOffsetTop(offsetTops);
  };
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        getOffsetTops();
      }, 3000);
    }
  }, [loading]);
  return (
    <div className="pb-[2rem]">
      <Loading loading={loading} className="w-full">
        <div ref={boxRef} className="[&>div]:relative">
          <div ref={overViewRef}>
            <OverView />
          </div>
          <div ref={timeLineRef} className="mt-[4rem]">
            <TimeLine />
          </div>
          <div ref={yourFuelingBoardRef} className="mt-[4rem]">
            <YourFuelingBoard />
          </div>
          <div ref={aboutRef} className="mt-[4rem]">
            <About />
          </div>
          <div ref={demoVideoRef} className="mt-[4rem]">
            <DemoVideo />
          </div>
          <div ref={keyMetricsRef} className="mt-[4rem]">
            <KeyMetrics />
          </div>
          <div ref={tractionsRef} className="mt-[4rem]">
            <Tractions />
          </div>
        </div>
      </Loading>
    </div>
  );
};

export default Content;
