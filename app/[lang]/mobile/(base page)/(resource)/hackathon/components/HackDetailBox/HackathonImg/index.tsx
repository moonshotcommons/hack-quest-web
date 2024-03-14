import React from 'react';
import Box from '../components/Box';
import { HackathonType } from '@/service/webApi/resourceStation/type';

interface HackathonImgProp {
  hackathon: HackathonType;
}

const HackathonImg: React.FC<HackathonImgProp> = ({ hackathon }) => {
  return (
    <Box className="relative w-full overflow-hidden p-0">
      <img src={hackathon.image} className="w-full" />
    </Box>
  );
};

export default HackathonImg;
