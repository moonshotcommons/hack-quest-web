import React from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
interface AboutProp {
  hackathon: HackathonType;
}

const About: React.FC<AboutProp> = ({ hackathon }) => {
  return <img src={hackathon.image} className="w-full rounded-[16px]" alt={hackathon.alias} />;
};

export default About;
