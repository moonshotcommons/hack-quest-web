import { FC, ReactNode, useEffect, useState } from 'react';
import ProjectCard from '../../ProjectCard';
import Pagination from '../../Common/Pagination';
import Link from 'next/link';
import OtherProjects from './OtherProjects';
import { Typography } from 'antd';
import InfoBlock from './InfoBloack';
import { useRequest } from 'ahooks';
import Loading from '../../Common/Loading';
import webApi from '@/service';
import { ProjectType } from '@/service/webApi/resourceStation/project/type';
import { errorMessage } from '@/helper/utils';
import YouTube from 'react-youtube';
import Image from 'next/image';
interface ProjectDetailProps {
  projectId: string;
}

const ProjectDetail: FC<ProjectDetailProps> = (props) => {
  const { projectId } = props;

  const [project, setProject] = useState<ProjectType>();

  const { run, loading } = useRequest(
    async () => {
      const res = await webApi.project.getProjectsDetail(projectId);
      return res;
    },
    {
      onSuccess(res) {
        setProject(res);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const getYoutubeId = (uri: string) => {
    const url = new URL(uri);
    return url.searchParams.get('v') || '';
  };

  useEffect(() => {
    run();
  }, [projectId]);

  return (
    <Loading loading={loading}>
      <div className="w-full min-h-[50vh]">
        {project && (
          <div className="flex justify-between gap-x-[80px]">
            <div className="flex flex-col flex-1">
              <div className="flex gap-x-[15px] items-center">
                <div className="w-[48px] h-[48px] bg-gray-300 rounded-[10px] relative overflow-hidden flex items-center justify-center">
                  <Image
                    src={project.thumbnail}
                    width={48}
                    height={48}
                    alt="thumbnail"
                    className="object-cover"
                  ></Image>
                </div>
                <h1 className="font-next-poster-Bold text-[40px] tracking-[2.4px]">
                  {project.name}
                </h1>
              </div>
              <p className="mt-[8px] font-next-book text-[21px] leading-[160%] tracking-[0.42px]">
                {project.description}
              </p>
              <div className="mt-[30px] bg-gray-300 rounded-[10px] max-h-[504px] w-full">
                {!project.video.includes('youtube') && (
                  <video controls className="w-full">
                    <source src={project.video}></source>
                  </video>
                )}
                {project.video.includes('youtube') && (
                  <YouTube
                    videoId={getYoutubeId(project.video)}
                    loading="lazy"
                    iframeClassName="w-full min-h-[500px]"
                  />
                )}
              </div>
              <p className="mt-[15px] font-next-book text-[18px] leading-[160%] tracking-[0.36px] opacity-[0.6]">
                {`${project.hackathonName} · ${project.tracks.join(' · ')}`}
              </p>
              <div className="mt-[30px]">
                <InfoBlock
                  title="Introduction"
                  description={project.introduction}
                ></InfoBlock>
              </div>
              <div>
                <InfoBlock title="Team" description={project.team}></InfoBlock>
              </div>
            </div>
            <div>
              <OtherProjects
                activeProjectId={project.id}
                hackathonId={project.hackathonId}
                hackathonName={project.hackathonName}
              ></OtherProjects>
            </div>
          </div>
        )}
      </div>
    </Loading>
  );
};

export default ProjectDetail;
