import Image from 'next/image';
import { FC } from 'react';
import Loading from '@/public/images/other/loading.png';

interface LoadingIconProps {
  width?: number;
  height?: number;
}

const LoadingIcon: FC<LoadingIconProps> = ({ width, height }) => {
  return (
    <Image
      src={Loading}
      width={width || 40}
      height={height || 40}
      alt="loading"
      className="animate-spin object-contain opacity-100"
    ></Image>
  );
};

export default LoadingIcon;
