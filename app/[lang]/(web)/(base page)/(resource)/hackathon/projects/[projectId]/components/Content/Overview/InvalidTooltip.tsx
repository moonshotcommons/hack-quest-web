import type React from 'react';

interface InvalidTooltipProp {
  invalidReason: string;
}

const InvalidTooltip: React.FC<InvalidTooltipProp> = ({ invalidReason }) => {
  return (
    <div className="relative ">
      <div className="peer cursor-pointer">(Unqualified)</div>
      <div className="body-s absolute left-0 top-0 z-[88] hidden  translate-y-[-100%] rounded-xl border-[1px] border-neutral-300 bg-neutral-white p-6 text-neutral-600 peer-hover:block ">
        <div className="flex w-[250px] flex-col justify-between gap-4">
          <p>{invalidReason}</p>
        </div>
      </div>
    </div>
  );
};

export default InvalidTooltip;
