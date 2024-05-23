import React from 'react';
import Dot from '../Dot';

interface TitleProp {
  title: string;
  description: string;
}

const Title: React.FC<TitleProp> = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-h3 relative mb-[16px] text-neutral-black">
        <span>{title}</span>
        <Dot />
      </h2>
      <p className="body-m  text-neutral-medium-gray">{description}</p>
    </div>
  );
};

export default Title;
