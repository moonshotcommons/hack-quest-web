import React from 'react';

interface TitleProp {
  title: string;
}

const Title: React.FC<TitleProp> = ({ title }) => {
  return (
    <div className="text-h3 relative mb-[32px] pl-[21px] text-neutral-black">
      {title}
      <span className="absolute left-0 top-0 h-full w-[5px] rounded-[100px] bg-yellow-dark"></span>
    </div>
  );
};

export default Title;
