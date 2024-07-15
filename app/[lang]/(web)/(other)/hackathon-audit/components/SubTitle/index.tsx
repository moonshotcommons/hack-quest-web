import React from 'react';

interface SubTitleProp {
  title: string;
}

const SubTitle: React.FC<SubTitleProp> = ({ title }) => {
  return (
    <div className="text-h3 relative mb-[15px] pl-[15px] leading-[34px] text-neutral-black">
      {title}
      <div className="absolute left-0 top-0 h-full w-[5px] rounded-[100px] bg-yellow-dark"></div>
    </div>
  );
};

export default SubTitle;
