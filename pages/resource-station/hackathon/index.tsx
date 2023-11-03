import React from 'react';
import HackathonBox from '@/components/v2/ResourceStation/HackathonBox';
import FeatureProject from '@/components/v2/ResourceStation/FeaturedProject';

function Hackathon() {
  return (
    <div className="font-next-book text-home-default-color">
      <HackathonBox />
      <FeatureProject />
    </div>
  );
}

export default Hackathon;
