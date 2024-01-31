import React from 'react';

interface TitleProp {
  title: string;
}

const Title: React.FC<TitleProp> = ({ title }) => {
  return (
    <div className="mb-[20px] text-neutral-black text-[40px] leading-[46px] font-next-book-bold tracking-[2.4px]">
      {title}
    </div>
  );
};

export default Title;
