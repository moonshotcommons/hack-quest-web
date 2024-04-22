import React from 'react';

interface CentralTitleProp {
  title: string;
}

const CentralTitle: React.FC<CentralTitleProp> = ({ title }) => {
  return (
    <div className="mb-[1.25rem] flex justify-center">
      <div className="border-b-[.1875rem] border-t-[.1875rem] border-[#6A5DFF] py-[.5rem] text-[1.5rem] font-bold uppercase leading-[110%] text-neutral-white">
        {title}
      </div>
    </div>
  );
};

export default CentralTitle;
