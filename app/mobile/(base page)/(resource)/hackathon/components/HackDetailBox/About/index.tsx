import React from 'react';
import Box from '../components/Box';
import { HackathonType } from '@/service/webApi/resourceStation/type';
interface AboutProp {
  hackathon: HackathonType;
}

const About: React.FC<AboutProp> = ({ hackathon }) => {
  return (
    <Box>
      <div className="text-h3-mob mb-[.5rem] text-neutral-off-black">About</div>
      <div className="body-m ">{hackathon.about}</div>
    </Box>
  );
};

export default About;
