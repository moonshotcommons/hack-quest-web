import React from 'react';
import HackathonBox from '@/components/v2/ResourceStation/HackathonBox';
import FeatruedProject from '@/components/v2/ResourceStation/HackathonBox/FeatruedProject';

function Hackathon() {
  return (
    <div className="font-next-book text-home-default-color">
      <HackathonBox />
      <FeatruedProject />
    </div>
  );
}

export default Hackathon;
