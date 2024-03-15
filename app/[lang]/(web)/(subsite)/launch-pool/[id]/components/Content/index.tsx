'use client';
import React from 'react';
import OverView from './OverView';
import TimeLine from './TimeLine';
import YourFuelingBoard from './YourFuelingBoard';
import About from './About';
import DemoVideo from './DemoVideo';
import KeyMetrics from './KeyMetrics';
import Tractions from './Tractions';

interface ContentProp {}

const Content: React.FC<ContentProp> = () => {
  return (
    <div className="flex-1">
      <OverView />
      <TimeLine />
      <YourFuelingBoard />
      <About />
      <DemoVideo />
      <KeyMetrics />
      <Tractions />
    </div>
  );
};

export default Content;
