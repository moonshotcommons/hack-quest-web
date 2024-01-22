import React, { ReactNode } from 'react';
import { VscChevronDown } from 'react-icons/vsc';

interface ShowAllProp {
  showAll: boolean;
  changeShowAll: VoidFunction;
  children: ReactNode;
  isShowAllButton: boolean;
}

const ShowAll: React.FC<ShowAllProp> = ({
  showAll,
  changeShowAll,
  children,
  isShowAllButton
}) => {
  return (
    <>
      <div className="flex flex-wrap gap-[1.25%]">{children}</div>
      {isShowAllButton && (
        <div className="flex justify-end text-[18px]">
          <div
            className="flex items-center cursor-pointer"
            onClick={changeShowAll}
          >
            <span>Show {showAll ? 'Less' : 'All'}</span>
            <VscChevronDown
              className={`transition text-[24px] ${
                showAll ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ShowAll;
