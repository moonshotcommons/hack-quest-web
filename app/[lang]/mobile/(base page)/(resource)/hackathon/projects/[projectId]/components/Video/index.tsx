'use client';
import { FC } from 'react';
import YouTube from 'react-youtube';

interface ProjectVideoProps {
  videoUrl: string;
}

const ProjectVideo: FC<ProjectVideoProps> = function ProjectVideo({ videoUrl }) {
  const getYoutubeId = (uri: string) => {
    const url = new URL(uri);
    return url.searchParams.get('v') || '';
  };
  return (
    <>
      <div className="w-full rounded-[.625rem] bg-gray-300">
        {!videoUrl.includes('youtube') && (
          <video controls className={`max-h-[18.75rem] w-full`}>
            <source src={videoUrl}></source>
          </video>
        )}
        {videoUrl.includes('youtube') && (
          <YouTube videoId={getYoutubeId(videoUrl)} loading="lazy" iframeClassName="w-full max-h-[18.75rem]" />
        )}
      </div>
    </>
  );
};

export default ProjectVideo;
