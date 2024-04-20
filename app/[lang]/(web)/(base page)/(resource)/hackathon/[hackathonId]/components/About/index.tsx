import React from 'react';
import Box from '../components/Box';
import { HackathonType } from '@/service/webApi/resourceStation/type';
interface AboutProp {
  hackathon: HackathonType;
}

const About: React.FC<AboutProp> = ({ hackathon }) => {
  return (
    <Box className="border-transparent">
      <img src={hackathon.image} className="w-full" alt={hackathon.alias} />
    </Box>
  );
};

export default About;
