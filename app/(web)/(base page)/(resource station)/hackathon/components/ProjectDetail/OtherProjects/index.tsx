import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import ProjectCard from '@/components/Web/Business/ProjectCard';
import Pagination from '@/components/Common/Pagination';
import { errorMessage } from '@/helper/ui';
import webApi from '@/service';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import { useRequest } from 'ahooks';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
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

  const { run } = useRequest(
    async () => {
      const res = await webApi.resourceStationApi.getProjectsList({
        keyword: hackathonName
        // page: page,
        // limit: PROJECTS_LIMIT
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

  useEffect(() => {
    setPage(1);
  }, [hackathonId, hackathonName, activeProjectId]);

  useEffect(() => {
    run();
  }, [page, activeProjectId]);

  return (
    <>
      <h3 className="font-next-poster-Bold text-[40px] tracking-[2.4px] leading-normal">
        Other Projects
      </h3>
      <p className="mt-[8px] font-next-book text-[21px] leading-[160%] tracking-[0.42px]">
        {`in `}
        <Link
          href={`${MenuLink.PROJECTS}?menu=${Menu.PROJECTS}&${QueryIdType.PROJECT_ID}=projects&keyWord=${hackathonName}`}
          className="text-[#0B0B0B] underline hover:opacity-70 hover:text-[#0B0B0B] hover:underline transition-all"
        >
          {hackathonName}
        </Link>
      </p>
      <div className="mt-[30px]">
        <div className="flex flex-col gap-y-[30px] mb-[30px]">
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
