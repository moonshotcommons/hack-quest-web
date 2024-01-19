'use client';
import { NotionComponent } from '@/components/Web/Business/Renderer/type';
import { FC, useEffect, useRef } from 'react';

interface VideoRendererProps {
  component: NotionComponent;
  parent: any;
}

const VideoRenderer: FC<VideoRendererProps> = (props) => {
  const { component, parent } = props;
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      import('plyr').then((Plyr) => {
        const player = new Plyr.default(ref.current!);
      });
    }
  }, []);
  return (
    <div className="w-full rounded-[10px] overflow-hidden mt-[30px]">
      <video ref={ref} controls>
        {/* width="400px" */}
        {<source src={'/test.mp4'} type="video/mp4" />}
      </video>
    </div>
    // <ReactPlayer url="/test.mp4" />
  );
};

export default VideoRenderer;
