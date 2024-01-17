'use client';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import ProjectCard from '@/components/Web/Business/ProjectCard';
import Pagination from '@/components/Common/Pagination';
import Link from 'next/link';
import { FC, useRef, useState } from 'react';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { ProjectType } from '@/service/webApi/resourceStation/type';
let PROJECTS_LIMIT = 3;
interface OtherProjectsProps {
  hackathonName: string;
  projects: ProjectType[];
}

const OtherProjects: FC<OtherProjectsProps> = ({ hackathonName, projects }) => {
  const [page, setPage] = useState(1);
  const scrollContainer = useRef<HTMLDivElement>(null);
  const totalPage = projects.length;

  const scrollToPage = (page: number): void => {
    setPage(page);
    const position = (page - 1) * PROJECTS_LIMIT;
    const element = scrollContainer.current?.children[position];
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <>
      <h3 className="font-next-poster-Bold text-[40px] tracking-[2.4px] leading-normal">
        Other Projects
      </h3>
      <p className="mt-[8px] font-next-book text-[21px] leading-[160%] tracking-[0.42px]">
        {`in `}
        <Link
          href={`${MenuLink.PROJECTS}?menu=${Menu.HACKATHON}&${QueryIdType.PROJECT_ID}=projects&keyWord=${hackathonName}`}
          className="text-[#0B0B0B] underline hover:opacity-70 hover:text-[#0B0B0B] hover:underline transition-all"
        >
          {hackathonName}
        </Link>
      </p>
      <div className="mt-[30px]">
        <div
          ref={scrollContainer}
          className="flex flex-col gap-y-[30px] max-h-270 overflow-y-hidden pt-2 px-2"
        >
          {projects.map((project) => (
            <ProjectCard
              className="flex-none"
              key={project.id}
              project={project}
            />
          ))}
        </div>
        {totalPage > PROJECTS_LIMIT && (
          <Pagination
            total={Math.ceil((totalPage - 1) / PROJECTS_LIMIT)}
            page={page}
            onPageChange={scrollToPage}
          ></Pagination>
        )}
      </div>
    </>
  );
};

export default OtherProjects;
