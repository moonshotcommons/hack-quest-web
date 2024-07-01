'use client';
import Link from 'next/link';
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

  const isYoutubeUrl = videoUrl.includes('youtube') || videoUrl.includes('youtu.be');

  const renderVideo = () => {
    if (isYoutubeUrl) {
      return <YouTube videoId={getYoutubeId(videoUrl)} loading="lazy" iframeClassName="w-full h-[500px]" />;
    }
    if (!videoUrl.includes('youtu')) {
      if (!videoUrl.includes('hackquest.io')) {
        return (
          <Link href={videoUrl} target="_blank" className="body-m text-neutral-medium-gray">
            {videoUrl}
          </Link>
        );
      }
      return (
        <video controls className={`h-[500px] w-full`}>
          <source src={videoUrl}></source>
        </video>
      );
    }
  };

  return (
    <>
      <div className="w-full rounded-[10px] bg-gray-300">{renderVideo()}</div>
    </>
  );
};

export default ProjectVideo;
