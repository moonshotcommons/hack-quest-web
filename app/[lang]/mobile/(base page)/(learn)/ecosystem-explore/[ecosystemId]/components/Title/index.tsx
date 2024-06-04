import React from 'react';
import Dot from '../Dot';

interface TitleProp {
  title: string;
  description?: string;
}

const Title: React.FC<TitleProp> = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-h3-mob relative text-neutral-black">
        <span>{title}</span>
        <Dot />
      </h2>
      {description && <p className="body-s mt-[0.25rem] text-neutral-medium-gray">{description}</p>}
    </div>
  );
};

export default Title;
