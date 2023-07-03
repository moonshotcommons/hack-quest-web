import React from 'react';

interface TagProps {
  children: string;
}

const Tag: React.FC<TagProps> = (props) => {
  const { children } = props;
  return (
    <div className="w-fit px-2 py-1 font-next-book-Thin text-[0.5625rem] rounded-[1.25rem] border border-solid border-[#676767] text-white">
      {children}
    </div>
  );
};

export default Tag;
