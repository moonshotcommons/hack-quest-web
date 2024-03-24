import { NotionComponent } from '@/components/Web/Business/Renderer/type';
import useGetDevice from '@/hooks/utils/useGetDevice';
import { Image } from 'antd';
import { FC } from 'react';

interface ImageRendererProps {
  component: NotionComponent;
  parent: any;
}

const ImageRenderer: FC<ImageRendererProps> = (props) => {
  const { component } = props;
  const content = component.content;
  const isMobile = useGetDevice();
  if (content.external) {
    // return <img src={block.external.url} alt={``} />;
    return (
      <div className="py-4" data-type={component.type}>
        <Image
          src={content.external.url}
          alt="image"
          // width={400}
          className={`object-contain ${isMobile ? 'w-full' : 'w-[400px]'}`}
        />
      </div>
    );
  } else if (content.file) {
    // return <img src={block.file.url} alt={``} />;
    return (
      <div className="py-4" data-type={component.type}>
        <Image
          src={content.file.url}
          alt="image"
          // width={400}
          className={`rounded-xl object-contain ${
            isMobile ? 'w-full' : 'w-[400px]'
          }`}
        />
      </div>
    );
  }
  return <></>;
};

export default ImageRenderer;
