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
      <p className="text-h2 leading-[120%] tracking-[2.4px] text-neutral-off-black">
        {title}
      </p>
      <p className="mt-5 w-[763px] font-next-book text-[18px] leading-[125%] tracking-[0.36px] text-neutral-medium-gray">
        {description}
      </p>
    </div>
  );
};

export default PageDescription;
