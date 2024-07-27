import React, { useState } from 'react';
import { IoAdd, IoRemoveOutline } from 'react-icons/io5';
import WinnerCard from './WinnerCard';

interface BaseWinnersProp {
  winners: any;
  setWinners: (winners: any) => void;
}

const BaseWinners: React.FC<BaseWinnersProp> = ({ winners, setWinners }) => {
  const [viewCount, setViewCount] = useState(3);
  const changeCount = (count: number) => {
    const newCount = viewCount + count;
    if (newCount < 1 || newCount > winners.length) return;
    setViewCount(newCount);
  };
  const handleChangeName = (prizeName: string, index: number) => {
    const newWinners = structuredClone(winners);
    newWinners[index].prizeName = prizeName;
    setWinners(newWinners);
  };
  return (
    <div className="body-m flex flex-col gap-[16px] text-neutral-off-black">
      <p className="text-h5">Ranking-Based Winners</p>
      <div className="flex items-center gap-[20px]">
        <span className="text-neutral-rich-gray">Please set the number of ranking-based winners</span>
        <div className="flex items-center rounded-[8px] bg-neutral-off-white px-[12px] py-[8px] text-neutral-rich-gray">
          <IoRemoveOutline size={20} className="cursor-pointer" onClick={() => changeCount(-1)} />
          <div className="w-[60px] text-center">{viewCount}</div>
          <IoAdd size={20} className="cursor-pointer" onClick={() => changeCount(1)} />
        </div>
      </div>
      <div className="flex flex-col gap-[16px]">
        {winners.slice(0, viewCount).map((v: any, i: number) => (
          <WinnerCard key={v.id} winner={v} handleChangeName={(prizeName) => handleChangeName(prizeName, i)} />
        ))}
      </div>
    </div>
  );
};

export default BaseWinners;
