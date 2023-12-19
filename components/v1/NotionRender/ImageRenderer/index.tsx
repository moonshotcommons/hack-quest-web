import { Image } from 'antd';
import { FC } from 'react';

interface ImageRendererProps {
  source: any;
  type: string;
  parent: any;
}

const ImageRenderer: FC<ImageRendererProps> = (props) => {
  const { type, source } = props;
  const content = source[type];
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
