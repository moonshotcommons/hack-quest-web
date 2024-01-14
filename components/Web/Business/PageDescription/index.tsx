import React from 'react';
import { cn } from '@/helper/utils';

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
      <p className="body-l mt-5 w-[763px] text-neutral-medium-gray">
        {description}
      </p>
    </div>
  );
};

export default PageDescription;
