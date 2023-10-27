import { cn } from '@/helper/utils';
import React from 'react';

interface PageDescriptionType {
  title: string;
  description: string;
  className?: string;
}
const PageDescription: React.FC<PageDescriptionType> = ({
  title,
  description,
  className
}) => {
  return (
    <div className={cn(`pb-[60px] pt-[20px]`, className)}>
      <p className="text-[40px] font-next-poster-Bold tracking-[2.4px] ">
        {title}
      </p>
      <p className="text-[21px] font-next-book leading-[34px] w-[569px]">
        {description}
      </p>
    </div>
  );
};

export default PageDescription;
