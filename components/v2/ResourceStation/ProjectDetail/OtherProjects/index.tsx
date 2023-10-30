import Pagination from '@/components/v2/Common/Pagination';
import ProjectCard from '@/components/v2/ProjectCard';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface OtherProjectsProps {}

const OtherProjects: FC<OtherProjectsProps> = (props) => {
  return (
    <>
      <h3 className="font-next-poster-Bold text-[40px] tracking-[2.4px] leading-normal">
        Other Projects
      </h3>
      <p className="mt-[8px] font-next-book text-[21px] leading-[160%] tracking-[0.42px]">
        in<Link href={'#'}>HackQuest Hackathon 2023</Link>
      </p>
      <div className="mt-[30px]">
        <div className="flex flex-col gap-y-[30px] mb-[30px]">
          <ProjectCard project={{}}></ProjectCard>
          <ProjectCard project={{}}></ProjectCard>
          <ProjectCard project={{}}></ProjectCard>
        </div>
        <Pagination total={4} page={1} onPageChange={() => {}}></Pagination>
      </div>
    </>
  );
};

export default OtherProjects;
