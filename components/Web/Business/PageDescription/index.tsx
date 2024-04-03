import React from 'react';
import { cn } from '@/helper/utils';

interface PageDescriptionType {
  title: string;
  description: string;
  className?: string;
}
const PageDescription: React.FC<PageDescriptionType> = ({ title, description, className }) => {
  return (
    <div className={cn(`pb-[60px] pt-[20px]`, className)}>
      <h1 className="text-h2  text-neutral-off-black">{title}</h1>
      <p className="body-l mt-5 w-[763px] text-neutral-medium-gray">{description}</p>
    </div>
  );
};

export default PageDescription;
