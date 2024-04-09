import React from 'react';
import { IoIosArrowUp } from 'react-icons/io';

interface BackTopProp {
  handleBackTop: VoidFunction;
}

const BackTop: React.FC<BackTopProp> = ({ handleBackTop }) => {
  return (
    <div
      className="flex-center fixed bottom-[.625rem] right-[0] h-[3.75rem] w-[3.75rem] cursor-pointer rounded-l-[1rem] bg-yellow-primary text-neutral-black"
      onClick={handleBackTop}
    >
      <IoIosArrowUp size={24} />
    </div>
  );
};

export default BackTop;
