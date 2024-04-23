import React from 'react';

interface SubTitleProp {
  title: string;
}

const SubTitle: React.FC<SubTitleProp> = ({ title }) => {
  return (
    <div className="text-h3-mob relative mb-[.9375rem] pl-[.9375rem] leading-[1.375rem] text-neutral-black">
      {title}
      <div className="absolute left-0 top-0 h-full w-[.3125rem] rounded-[6.25rem] bg-yellow-dark"></div>
    </div>
  );
};

export default SubTitle;
