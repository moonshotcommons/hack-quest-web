import React from 'react';
import Box from '../components/Box';
import Title from '../components/Title';
import Astronaut from '@/public/images/landing/astronaut.png';
import Image from 'next/image';
interface AboutProp {
  hackathonData: any;
}

const About: React.FC<AboutProp> = ({ hackathonData }) => {
  return (
    <div>
      <Box className=" h-[383px]  overflow-hidden">
        <Image src={Astronaut} alt="astronaut" className="w-full"></Image>
      </Box>
      <Box>
        <Title title="About" />
        <div className="text-[21px] leading-[33px] tracking-[0.42px]">
          We shall not only bring a mere hackathon experience, but infinite
          inspirations, creations, and opportunities. We wish to preserve the
          moment of insight, and turn unrestrained thoughts into reality.
        </div>
      </Box>
    </div>
  );
};

export default About;
