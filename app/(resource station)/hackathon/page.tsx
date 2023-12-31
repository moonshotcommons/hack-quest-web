'use client';
import React, { useEffect } from 'react';
import HackathonBox from '@/components/v2/ResourceStation/HackathonBox';
import FeatureProject from '@/components/v2/ResourceStation/FeaturedProject';
import { BurialPoint } from '@/helper/burialPoint';

function Hackathon() {
  useEffect(() => {
    const startTime = new Date().getTime();
    return () => {
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      BurialPoint.track('hackathon-页面留存时间', {
        duration
      });
    };
  }, []);
  return (
    <div className="font-next-book text-home-default-color">
      <HackathonBox />
      <FeatureProject />
    </div>
  );
}

export default Hackathon;
