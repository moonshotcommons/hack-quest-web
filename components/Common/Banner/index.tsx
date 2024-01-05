import { FC, ReactNode } from 'react';

interface BannerProps {
  children: ReactNode;
}

const Banner: FC<BannerProps> = (props) => {
  return <div className="w-full h-[11.72rem]">Banner</div>;
};

export default Banner;
