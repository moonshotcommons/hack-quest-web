import React from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import WinnerCard from './WinnerCard';
import { HackathonJugingInfoType, HackathonWinnerType } from '@/service/webApi/resourceStation/type';

interface WinnerAddProp {
  winners: HackathonWinnerType[];
  handleAdd: VoidFunction;
  handleDelete: (winner: HackathonWinnerType) => void;
  handleEdit: (winner: HackathonWinnerType) => void;
  loading: boolean;
  judgeInfo: HackathonJugingInfoType;
}

const WinnerAdd: React.FC<WinnerAddProp> = ({ winners, handleAdd, handleDelete, handleEdit, loading, judgeInfo }) => {
  return (
    <div>
      <div className="flex flex-col gap-[16px]">
        {winners.map((v: any, i: number) => (
          <WinnerCard
            disabled={judgeInfo.reward?.judge?.announce}
            winner={v}
            key={v.id}
            handleChangeWinner={(winner) => handleEdit(winner)}
            handleRemoveWinner={() => handleDelete(v)}
            judgeInfo={judgeInfo}
          />
        ))}
        {!judgeInfo.reward?.judge?.announce && (
          <div
            className="flex cursor-pointer items-center justify-center gap-[8px] rounded-[16px] border border-dotted border-neutral-medium-gray py-[24px] text-neutral-medium-gray"
            onClick={handleAdd}
          >
            <IoIosAddCircle size={26} />
            <span>Add a winner</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WinnerAdd;
