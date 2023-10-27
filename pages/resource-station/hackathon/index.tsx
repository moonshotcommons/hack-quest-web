import React from 'react';
import HackathonBox from '@/components/v2/ResourceStation/HackathonBox';
import FeaturedProject from '@/components/v2/ResourceStation/FeaturedProject';

function Hackathon() {
  return (
    <div className="font-next-book text-home-default-color">
      <HackathonBox />
      <FeaturedProject />
    </div>
  );
}

export default Hackathon;
