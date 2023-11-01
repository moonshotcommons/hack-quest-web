import { FC } from 'react';
import { NotionComponent } from '../../LessonPage/type';

interface VideoRendererProps {
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
