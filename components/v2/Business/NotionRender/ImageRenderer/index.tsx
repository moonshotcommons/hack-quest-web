import { NotionComponent } from '@/components/v2/Business/ComponentRenderer/type';
import { Image } from 'antd';
import { FC } from 'react';

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
          className="object-contain rounded-xl"
        />
      </div>
    );
  }
  return <></>;
};

export default ImageRenderer;
