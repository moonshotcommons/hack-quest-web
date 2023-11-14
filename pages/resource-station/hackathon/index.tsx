import React from 'react';
import HackathonBox from '@/components/v2/ResourceStation/HackathonBox';
import FeatureProject from '@/components/v2/ResourceStation/FeaturedProject';
import Title from '@/components/Head/Title';

function Hackathon() {
  return (
    <div className="font-next-book text-home-default-color">
      <Title title="Hackathon" />
      <HackathonBox />
      <FeatureProject />
    </div>
  );
}

export default Hackathon;
