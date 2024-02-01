'use client';
import { errorMessage } from '@/helper/ui';
import webApi from '@/service';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import { useRequest } from 'ahooks';
import Image from 'next/image';
import { FC, useEffect, useMemo, useState } from 'react';
import YouTube from 'react-youtube';
import InfoBlock from './InfoBloack';
import OtherProjects from './OtherProjects';
import Loading from '@/components/Common/Loading';
interface ProjectDetailProps {
  projectId: string;
}

const ProjectDetail: FC<ProjectDetailProps> = (props) => {
  const { projectId } = props;

  const [project, setProject] = useState<ProjectType>();

  const { run, loading } = useRequest(
    async () => {
      const res = await webApi.resourceStationApi.getProjectsDetail(projectId);
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

  const Video = useMemo(() => {
    return (
      <>
        {project?.video && (
          <div className="mt-[30px] max-h-[504px] w-full rounded-[10px] bg-gray-300">
            {!project.video.includes('youtube') && (
              <video controls className="w-full" key={project.id}>
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
        )}
        {!project?.video && project?.thumbnail && (
          <div className="relative mt-4 h-[504px] w-full">
            <Image src={project?.thumbnail} alt="hackquest" fill></Image>
          </div>
        )}
      </>
    );
  }, [project]);

  return (
    <Loading loading={loading}>
      <div className="min-h-[50vh] w-full">
        {project && (
          <div className="flex justify-between gap-x-[80px]">
            <div className="flex flex-1 flex-col">
              <div className="flex items-center gap-x-[15px]">
                <div className="relative flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[10px] bg-gray-300">
                  <Image
                    src={project.thumbnail}
                    width={48}
                    height={48}
                    alt="thumbnail"
                    className="object-cover"
                  ></Image>
                </div>
                <h1 className="text-h2">{project.name}</h1>
              </div>
              <p className="body-l mt-[8px]">{project.description}</p>
              {Video}
              <p className="body-l mt-[30px] opacity-[0.6]">
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
