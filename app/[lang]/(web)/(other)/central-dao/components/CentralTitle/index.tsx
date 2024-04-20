import React from 'react';

interface CentralTitleProp {
  title: string;
}

const CentralTitle: React.FC<CentralTitleProp> = ({ title }) => {
  return (
    <div className="mb-[24px] flex justify-center">
      <div className="border-b-[3px] border-t-[3px] border-[#C418A8] py-[8px] text-[26px] font-bold uppercase leading-[110%] text-neutral-white">
        {title}
      </div>
    </div>
  );
};

export default CentralTitle;
