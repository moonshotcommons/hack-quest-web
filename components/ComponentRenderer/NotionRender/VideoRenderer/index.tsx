import { FC } from 'react';
import { NotionComponent } from '../type';
import { CustomComponent } from '../../type';

interface VideoRendererProps {
  prevComponent: NotionComponent | CustomComponent | null;
  nextComponent: NotionComponent | CustomComponent | null;
  position: number;
  component: NotionComponent;
  parent: any;
}

const VideoRenderer: FC<VideoRendererProps> = (props) => {
  const { component, parent } = props;

  return (
    <div>
      <video controls className="w-[80%]">
        {/* width="400px" */}
        {<source src={component.content.file.url} />}
      </video>
    </div>
  );
};

export default VideoRenderer;
