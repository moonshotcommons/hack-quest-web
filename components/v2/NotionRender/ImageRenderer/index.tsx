import { Image } from 'antd';
import { FC } from 'react';
import { NotionComponent } from '../../LessonPage/type';

interface ImageRendererProps {
  component: NotionComponent;
  parent: any;
}

const ImageRenderer: FC<ImageRendererProps> = (props) => {
  const { component } = props;
  const content = component.content;
  if (content.external) {
    // return <img src={block.external.url} alt={``} />;
    return (
      <div className="py-4">
        <Image
          src={content.external.url}
          alt="image"
          width={400}
          className="object-contain"
        />
      </div>
    );
  } else if (content.file) {
    // return <img src={block.file.url} alt={``} />;
    return (
      <div className="py-4">
        <Image
          src={content.file.url}
          alt="image"
          width={400}
          className="object-contain"
        />
      </div>
    );
  }
  return <></>;
};

export default ImageRenderer;
