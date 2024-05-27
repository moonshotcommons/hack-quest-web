import React from 'react';

interface DotProp {}

const Dot: React.FC<DotProp> = () => {
  return (
    <div className="flex-center absolute left-[-44px] top-[50%] h-[24px] w-[24px] translate-y-[-50%] rounded-[50%] border border-neutral-black bg-neutral-off-white">
      <div className="h-[6px] w-[6px] rounded-[50%] bg-neutral-black"></div>
    </div>
  );
};

export default Dot;
