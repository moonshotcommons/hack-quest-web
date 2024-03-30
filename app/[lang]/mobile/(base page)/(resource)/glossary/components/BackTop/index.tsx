import React from 'react';
import { IoIosArrowUp } from 'react-icons/io';

interface BackTopProp {
  backTop: VoidFunction;
}

const BackTop: React.FC<BackTopProp> = ({ backTop }) => {
  return (
    <div
      className="flex-center fixed bottom-[.3125rem] right-[0] h-[3.75rem] w-[3.75rem] rounded-l-[1rem] bg-yellow-primary text-neutral-black"
      onClick={backTop}
    >
      <IoIosArrowUp size={24} />
    </div>
  );
};

export default BackTop;
