import { cn } from '@/helper/utils';
import Image, { ImageProps } from 'next/image';
import React from 'react';

interface ImageProp {
  className: string;
  contain?: boolean;
}

type BaseImageProp = ImageProp & ImageProps;

const BaseImage: React.FC<BaseImageProp> = ({ className, contain, ...rest }) => {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {rest.src && <Image {...rest} fill className={`${contain ? 'object-contain' : 'object-cover'}`} />}
    </div>
  );
};

export default BaseImage;
