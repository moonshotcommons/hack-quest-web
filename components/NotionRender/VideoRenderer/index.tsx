import { FC } from 'react';

interface VideoRendererProps {
  type: string;
  source: any;
  parent: any;
}

const VideoRenderer: FC<VideoRendererProps> = (props) => {
  const { source, type, parent } = props;

  return (
    <div>
      <video controls className="w-[80%]">
        {/* width="400px" */}
        {<source src={source[type][source[type].type].url} />}
      </video>
    </div>
  );
};

export default VideoRenderer;
