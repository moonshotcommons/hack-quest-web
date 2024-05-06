import React from 'react';

interface TitleProp {
  title: string;
}

const Title: React.FC<TitleProp> = ({ title }) => {
  return (
    <div className={'text-h2-mob relative pl-[.8125rem] leading-[26px] text-neutral-black'}>
      {title}
      <div className="absolute left-0 top-0 h-full w-[5px] rounded-[100px] bg-yellow-dark"></div>
    </div>
  );
};

export default Title;
