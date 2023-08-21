import { Image } from 'antd';
import { FC, ReactNode } from 'react';
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
    return <Image src={content.external.url} alt="image" />;
  } else if (content.file) {
    // return <img src={block.file.url} alt={``} />;
    return <Image src={content.file.url} alt="image" />;
  }
  return <></>;
};

export default ImageRenderer;
