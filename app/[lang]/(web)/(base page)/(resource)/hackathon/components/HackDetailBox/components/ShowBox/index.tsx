import React, { ReactNode } from 'react';
import { VscChevronDown } from 'react-icons/vsc';

interface ShowAllProp {
  showAll: boolean;
  changeShowAll: VoidFunction;
  children: ReactNode;
  isShowAllButton: boolean;
}

const ShowAll: React.FC<ShowAllProp> = ({ showAll, changeShowAll, children, isShowAllButton }) => {
  return (
    <>
      <div className="flex flex-wrap gap-[1.25%]">{children}</div>
      {isShowAllButton && (
        <div className="body-l flex justify-end">
          <div className="flex cursor-pointer items-center" onClick={changeShowAll}>
            <span>Show {showAll ? 'Less' : 'All'}</span>
            <VscChevronDown className={`body-xl transition ${showAll ? 'rotate-180' : ''}`} />
          </div>
        </div>
      )}
    </>
  );
};

export default ShowAll;
