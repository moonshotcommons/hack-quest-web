import React from 'react';

interface PageDescriptionType {
  title: string;
  description: string;
}
const PageDescription: React.FC<PageDescriptionType> = ({
  title,
  description
}) => {
  return (
    <div>
      <p className="text-[40px] font-next-poster-Bold tracking-[2.4px]">
        {title}
      </p>
      <p className="text-[21px] leading-[34px] w-[569px]">{description}</p>
    </div>
  );
};

export default PageDescription;
