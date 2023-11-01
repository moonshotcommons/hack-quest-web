import Pagination from '@/components/v2/Common/Pagination';
import ProjectCard from '@/components/v2/ProjectCard';
import { errorMessage } from '@/helper/utils';
import webApi from '@/service';
import { ProjectType } from '@/service/webApi/resourceStation/project/type';
import { useRequest } from 'ahooks';
import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';
let PROJECTS_LIMIT = 3;
interface OtherProjectsProps {
  hackathonId: string;
  hackathonName: string;
  activeProjectId: string;
}

const OtherProjects: FC<OtherProjectsProps> = (props) => {
  const { hackathonId, hackathonName, activeProjectId } = props;
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useRequest(
    async () => {
      const res = await webApi.project.getProjectsList({
        keyword: hackathonName,
        page: page,
        limit: PROJECTS_LIMIT
      });
      return res;
    },
    {
      onSuccess(res) {
        setProjects(
          res.data.filter((project) => project.id !== activeProjectId)
        );
        setTotalPage(res.total);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  return (
    <>
      <h3 className="font-next-poster-Bold text-[40px] tracking-[2.4px] leading-normal">
        Other Projects
      </h3>
      <p className="mt-[8px] font-next-book text-[21px] leading-[160%] tracking-[0.42px]">
        {`in `}
        <Link
          href={'#'}
          className="text-[#0B0B0B] underline hover:opacity-70 hover:text-[#0B0B0B] hover:underline transition-all"
        >
          {hackathonName}
        </Link>
      </p>
      <div className="mt-[30px]">
        <div className="flex flex-col gap-y-[30px] mb-[30px]">
          {projects.map((project) => {
            return (
              <ProjectCard key={project.id} project={project}></ProjectCard>
            );
          })}
        </div>
        {totalPage > PROJECTS_LIMIT && (
          <Pagination
            total={totalPage}
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
