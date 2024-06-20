import React from 'react';
import Box from '../components/Box';
import { HackathonType } from '@/service/webApi/resourceStation/type';
interface HackathonImageProp {
  hackathon: HackathonType;
}

const HackathonImage: React.FC<HackathonImageProp> = ({ hackathon }) => {
  return (
    <Box className="border-transparent">
      <img src={hackathon?.info?.image} className="w-full" alt={hackathon.alias} />
    </Box>
  );
};

export default HackathonImage;
