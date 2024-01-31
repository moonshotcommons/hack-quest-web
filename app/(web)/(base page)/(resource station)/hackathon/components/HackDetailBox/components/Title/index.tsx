import React from 'react';

interface TitleProp {
  title: string;
}

const Title: React.FC<TitleProp> = ({ title }) => {
  return (
    <div className="mb-[20px] font-next-book-bold text-[40px] leading-[46px] tracking-[2.4px] text-neutral-black">
      {title}
    </div>
  );
};

export default Title;
