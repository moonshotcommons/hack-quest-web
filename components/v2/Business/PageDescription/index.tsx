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
      <p className="text-h2 tracking-[2.4px] leading-[120%] text-[#131313]">
        {title}
      </p>
      <p className="text-[18px] font-next-book leading-[125%] tracking-[0.36px] mt-5 w-[763px] text-[#8C8C8C]">
        {description}
      </p>
    </div>
  );
};

export default PageDescription;
