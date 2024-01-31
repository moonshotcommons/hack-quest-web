import { FC, ReactNode } from 'react';

interface BannerProps {
  children: ReactNode;
}

const Banner: FC<BannerProps> = (props) => {
  return <div className="h-[11.72rem] w-full">Banner</div>;
};

export default Banner;
