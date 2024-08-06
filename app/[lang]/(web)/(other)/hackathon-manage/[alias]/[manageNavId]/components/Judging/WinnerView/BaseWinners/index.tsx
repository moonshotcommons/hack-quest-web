import React from 'react';
import { IoAdd, IoRemoveOutline } from 'react-icons/io5';
import WinnerCard from './WinnerCard';
import { HackathonJugingInfoType, HackathonWinnerType } from '@/service/webApi/resourceStation/type';

interface BaseWinnersProp {
  winners: HackathonWinnerType[];
  handleAdd: VoidFunction;
  handleDelete: VoidFunction;
  handleEdit: (winner: HackathonWinnerType) => void;
  loading: boolean;
  judgeInfo: HackathonJugingInfoType;
}

const BaseWinners: React.FC<BaseWinnersProp> = ({
  winners,
  handleAdd,
  handleDelete,
  handleEdit,
  loading,
  judgeInfo
}) => {
  const projects = judgeInfo?.projects || [];

  return (
    <div className="body-m flex flex-col gap-[16px] text-neutral-off-black">
      <p className="text-h5">Ranking-Based Winners</p>
      {!judgeInfo.reward?.judge?.announce && (
        <div className="flex items-center gap-[20px]">
          <span className="text-neutral-rich-gray">Please set the number of ranking-based winners</span>
          <div className="flex items-center rounded-[8px] bg-neutral-off-white px-[12px] py-[8px] text-neutral-rich-gray">
            <IoRemoveOutline
              size={20}
              className={`${winners.length <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => {
                if (winners.length <= 1 || loading) return;
                handleDelete();
              }}
            />
            <div className="w-[60px] text-center">{winners.length}</div>
            <IoAdd
              size={20}
              className={`${winners.length >= projects.length ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => {
                if (winners.length >= projects.length || loading) return;
                handleAdd();
              }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-[16px]">
        {winners.map((v: any) => (
          <WinnerCard
            key={v.id}
            disabled={judgeInfo.reward?.judge?.announce}
            winner={v}
            handleChangeName={(name) => handleEdit({ ...v, name })}
          />
        ))}
      </div>
    </div>
  );
};

export default BaseWinners;
