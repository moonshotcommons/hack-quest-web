import { FC, ReactNode } from 'react';
import ProjectCard from '../../ProjectCard';
import Pagination from '../../Common/Pagination';
import Link from 'next/link';
import OtherProjects from './OtherProjects';
import { Typography } from 'antd';
import InfoBlock from './InfoBloack';

interface ProjectDetailProps {}

const ProjectDetail: FC<ProjectDetailProps> = (props) => {
  return (
    <div className="flex justify-between gap-x-[80px]">
      <div className="flex flex-col flex-1">
        <div className="flex gap-x-[15px] items-center">
          <div className="w-[48px] h-[48px] bg-gray-300 rounded-[10px]"></div>
          <h1 className="font-next-poster-Bold text-[40px] tracking-[2.4px]">
            MetaLine-X
          </h1>
        </div>
        <p className="mt-[8px] font-next-book text-[21px] leading-[160%] tracking-[0.42px]">
          MetaLine-X is a comprehensive, fully onchain WebGame platform.
        </p>
        <div className="mt-[30px] bg-gray-300 rounded-[10px] h-[504px] w-full"></div>
        <p className="mt-[15px] font-next-book text-[18px] leading-[160%] tracking-[0.36px] opacity-[0.6]">
          HackQuest Hackathon 2023 · DeFi
        </p>
        <div className="mt-[30px]">
          <InfoBlock
            title="Introduction"
            description="MetaLine X is a comprehensive, fully onchain WebGame platform built upon the core products of MetaLine. Utilizing Layer3+ end- to-end foundational technology, MetaLine X offers a range of technical services, including engines, tools, SDKs, protocols, and more. This creates a complete WebGame ecosystem for creators, users, and investors within the entire ecosystem.MetaLine X is a comprehensive, fully onchain WebGame platform built upon the core products of MetaLine. Utilizing Layer3+ end- to-end foundational technology, MetaLine X offers a range of technical services, including engines, tools, SDKs, protocols, and more. This creates a complete WebGame ecosystem for creators, users, and investors within the entire ecosystem."
          ></InfoBlock>
        </div>
        <div>
          <InfoBlock
            title="Team"
            description="Most of MetaLine’s team graduated from world-renowned universities and have many years of experience in game development.
            Jack is the co-founder of MetaLine. He majored in finance at the University of Paris with a PhD. With more than 13 years of experience in Internet games, he has served as the head of game planning at Tudou.com and Kaixin.com, and has been deeply involved in the release of many games. After experiencing the wave of GAMEFI1.0, JAC decided to create a new cryptocurrency game that connects WEB2 and WEB3 users."
          ></InfoBlock>
        </div>
      </div>
      <div>
        <OtherProjects></OtherProjects>
      </div>
    </div>
  );
};

export default ProjectDetail;
