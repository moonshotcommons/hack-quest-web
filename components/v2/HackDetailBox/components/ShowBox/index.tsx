import { deepClone } from '@/helper/utils';
import React, { ReactNode, useMemo, useState } from 'react';
import { VscChevronDown } from 'react-icons/vsc';

interface ShowAllProp {
  showAll: boolean;
  changeShowAll: VoidFunction;
  children: ReactNode;
}

const ShowAll: React.FC<ShowAllProp> = ({
  showAll,
  changeShowAll,
  children
}) => {
  return (
    <>
      <div className="flex flex-wrap justify-between">{children}</div>
      <div className="flex justify-end text-[18px]">
        <div
          className="flex items-center cursor-pointer"
          onClick={changeShowAll}
        >
          <span>Show {showAll ? 'Less' : 'All'}</span>
          <VscChevronDown
            className={`transition text-[24px] ${showAll ? 'rotate-180' : ''}`}
          />
        </div>
      </div>
    </>
  );
};

export default ShowAll;
