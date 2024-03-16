'use client';
import React, { useEffect, useRef } from 'react';
import OverView from './OverView';
import TimeLine from './TimeLine';
import YourFuelingBoard from './YourFuelingBoard';
import About from './About';
import DemoVideo from './DemoVideo';
import KeyMetrics from './KeyMetrics';
import Tractions from './Tractions';

interface ContentProp {
  setAllTops: (tops: number[]) => void;
}

const Content: React.FC<ContentProp> = ({ setAllTops }) => {
  const overViewRef = useRef<HTMLDivElement>(null);
  const timeLineRef = useRef<HTMLDivElement>(null);
  const yourFuelingBoardRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const demoVideoRef = useRef<HTMLDivElement>(null);
  const keyMetricsRef = useRef<HTMLDivElement>(null);
  const tractionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAllTops([
      overViewRef.current?.offsetTop || 0,
      timeLineRef.current?.offsetTop || 0,
      yourFuelingBoardRef.current?.offsetTop || 0,
      aboutRef.current?.offsetTop || 0,
      demoVideoRef.current?.offsetTop || 0,
      keyMetricsRef.current?.offsetTop || 0,
      tractionsRef.current?.offsetTop || 0
    ]);
  }, []);
  return (
    <div className="flex-1">
      <div ref={overViewRef}>
        <OverView />
      </div>
      <div ref={timeLineRef} className="mt-[40px]">
        <TimeLine />
      </div>
      <div ref={yourFuelingBoardRef} className="mt-[120px]">
        <YourFuelingBoard />
      </div>
      <div ref={aboutRef} className="mt-[120px]">
        <About />
      </div>
      <div ref={demoVideoRef} className="mt-[120px]">
        <DemoVideo />
      </div>
      <div ref={keyMetricsRef} className="mt-[120px]">
        <KeyMetrics />
      </div>
      <div ref={tractionsRef} className="mt-[120px]">
        <Tractions />
      </div>
    </div>
  );
};

export default Content;
