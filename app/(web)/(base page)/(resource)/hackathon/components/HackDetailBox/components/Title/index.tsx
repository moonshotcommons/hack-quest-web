import React from 'react';

interface TitleProp {
  title: string;
}

const Title: React.FC<TitleProp> = ({ title }) => {
  return <div className="text-h2 mb-[20px] text-neutral-black">{title}</div>;
};

export default Title;
