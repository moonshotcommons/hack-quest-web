import React from 'react';
import Box from '../components/Box';
import { HackathonType } from '@/service/webApi/resourceStation/type';
interface AboutProp {
  hackathon: HackathonType;
}

const About: React.FC<AboutProp> = ({ hackathon }) => {
  return (
    <div>
      <Box className="relative w-full overflow-hidden p-0">
        <img src={hackathon.image} className="w-full" />
        {/* <Image
          src={hackathon.image}
          fill
          alt="astronaut"
          className="object-contain"
        ></Image> */}
      </Box>
      <Box>
        <div className="text-h3 mb-[16px] text-neutral-off-black">About</div>
        <div className="body-l ">{hackathon.about}</div>
      </Box>
    </div>
  );
};

export default About;
