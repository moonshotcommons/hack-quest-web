import { errorMessage } from '@/helper/utils';
import webApi from '@/service';
import { ProjectType } from '@/service/webApi/resourceStation/project/type';
import { useRequest } from 'ahooks';
import Image from 'next/image';
import { FC, useEffect, useMemo, useState } from 'react';
import YouTube from 'react-youtube';
import Loading from '../../Common/Loading';
import InfoBlock from './InfoBloack';
import OtherProjects from './OtherProjects';
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

  const Video = useMemo(() => {
    return (
      <>
        {project?.video && (
          <div className="mt-[30px] bg-gray-300 rounded-[10px] max-h-[504px] w-full">
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
          <div className="relative h-[504px] w-full mt-4">
            <Image src={project?.thumbnail} alt="hackquest" fill></Image>
          </div>
        )}
      </>
    );
  }, [project]);

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
              {Video}
              <p className="mt-[30px] font-next-book text-[18px] leading-[160%] tracking-[0.36px] opacity-[0.6]">
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
