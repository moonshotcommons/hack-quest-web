import React from 'react';

interface DotProp {}

const Dot: React.FC<DotProp> = () => {
  return (
    <div className="flex-center absolute left-[-1.75rem] top-[50%] h-[1rem] w-[1rem] translate-y-[-50%] rounded-[50%] border border-neutral-black bg-neutral-off-white">
      <div className="h-[.25rem] w-[.25rem] rounded-[50%] bg-neutral-black"></div>
    </div>
  );
};

export default Dot;
