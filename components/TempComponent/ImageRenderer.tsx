import { FC } from 'react';
import { FileBlockProps } from './type';
import { Image } from 'antd';

// const ImageRenderer: FC<FileProps> = ({ url }) => {
//   return <img src={url} />;
// };

const ImageRenderer: FC<FileBlockProps> = ({ block }) => {
  if (block.external) {
    // return <img src={block.external.url} alt={``} />;
    return <img src={block.external.url} />;
  } else if (block.file) {
    // return <img src={block.file.url} alt={``} />;
    return <img src={block.file.url} />;
  }
  return <></>;
};

export default ImageRenderer;
