import { FC } from 'react';
import { FileBlockProps } from './type';

const VideoRenderer: FC<FileBlockProps> = ({ block }) => {
  if (block.external) {
    return (
      <iframe
        width="560"
        height="315"
        src={getEmbedUrl(block.external.url)}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    );
  } else if (block.file) {
    return (
      <video controls>
        {/* width="400px" */}
        <source src={block.file.url} />
      </video>
    );
  }
  return <></>;
};

export default VideoRenderer;

const getEmbedUrl = (url: string) => {
  if (url.includes('youtube')) {
    return getYoutubeEmbedUrl(url);
  }
  return url;
};

const getYoutubeEmbedUrl = (url: string) => {
  const regex =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const result = url.match(regex);
  if (result && result[2] && result[2].length == 11) {
    const id = result[2];
    return '//www.youtube.com/embed/' + id;
  } else {
    return url;
  }
};
