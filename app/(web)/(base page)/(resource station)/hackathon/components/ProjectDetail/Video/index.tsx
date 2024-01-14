'use client';
import { FC } from 'react';
import Image from 'next/image';
import YouTube from 'react-youtube';
import { ProjectType } from '@/service/webApi/resourceStation/type';

interface ProjectVideoProps {
  project: ProjectType;
}

const ProjectVideo: FC<ProjectVideoProps> = function ProjectVideo({ project }) {
  const getYoutubeId = (uri: string) => {
    const url = new URL(uri);
    return url.searchParams.get('v') || '';
  };

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
};

export default ProjectVideo;
