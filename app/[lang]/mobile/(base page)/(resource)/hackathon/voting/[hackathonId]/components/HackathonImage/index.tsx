import React from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
interface HackathonImageProp {
  hackathon: HackathonType;
}

const HackathonImage: React.FC<HackathonImageProp> = ({ hackathon }) => {
  return <img src={hackathon.image} className="w-full rounded-[16px]" alt={hackathon.alias} />;
};

export default HackathonImage;
