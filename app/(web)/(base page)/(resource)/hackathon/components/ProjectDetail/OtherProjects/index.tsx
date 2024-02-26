'use client';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import ProjectCard from '@/components/Web/Business/ProjectCard';
import Pagination from '@/components/Common/Pagination';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import { FC, useRef, useState } from 'react';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
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
      <h3 className="text-h2">Other Projects</h3>
      <p className="body-l mt-[8px]">
        {`in `}
        <Link
          href={`${MenuLink.PROJECTS}?menu=${Menu.HACKATHON}&${QueryIdType.PROJECT_ID}=projects&keyword=${hackathonName}`}
          className="text-neutral-black underline transition-all hover:text-neutral-black hover:underline hover:opacity-70"
        >
          {hackathonName}
        </Link>
      </p>
      <div className="mt-[30px]">
        <div className="mb-[30px] flex flex-col gap-y-[30px]">
          {[...projects]
            .splice((page - 1) * PROJECTS_LIMIT, PROJECTS_LIMIT)
            .map((project) => {
              return (
                <ProjectCard key={project.id} project={project}></ProjectCard>
              );
            })}
        </div>
        {totalPage > PROJECTS_LIMIT && (
          <Pagination
            total={Math.ceil((totalPage - 1) / PROJECTS_LIMIT)}
            page={page}
            onPageChange={(v) => {
              setPage(v);
            }}
          ></Pagination>
        )}
      </div>
    </>
  );
};

export default OtherProjects;
