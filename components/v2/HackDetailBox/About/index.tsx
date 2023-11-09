import React from 'react';
import Box from '../components/Box';
import Title from '../components/Title';
import Image from 'next/image';
import { HackathonType } from '@/service/webApi/resourceStation/hackathon/type';
interface AboutProp {
  hackathon: HackathonType;
}

const About: React.FC<AboutProp> = ({ hackathon }) => {
  return (
    <div>
      <Box className="w-full relative p-0 overflow-hidden">
        <img src={hackathon.image} className="w-full" />
        {/* <Image
          src={hackathon.image}
          fill
          alt="astronaut"
          className="object-contain"
        ></Image> */}
      </Box>
      <Box>
        <Title title="About" />
        <div className="text-[21px] leading-[33px] tracking-[0.42px]">
          {hackathon.about}
        </div>
      </Box>
    </div>
  );
};

export default About;
