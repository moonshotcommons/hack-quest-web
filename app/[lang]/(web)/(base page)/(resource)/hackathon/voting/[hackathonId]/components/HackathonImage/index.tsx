import React from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
interface HackathonImageProp {
  hackathon: HackathonType;
}

const HackathonImage: React.FC<HackathonImageProp> = ({ hackathon }) => {
  return (
    <img
      src={hackathon.info?.image}
      className="w-full rounded-[16px] shadow-[0_0_4px_0_rgba(0,0,0,0.12)]"
      alt={hackathon.alias}
    />
  );
};

export default HackathonImage;
