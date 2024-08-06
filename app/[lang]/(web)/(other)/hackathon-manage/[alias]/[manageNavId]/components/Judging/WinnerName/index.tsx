import { HackathonWinnerType } from '@/service/webApi/resourceStation/type';
import React, { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';

interface WinnerNameProp {
  winner: HackathonWinnerType;
  handleChangeName: (prizeName: string) => void;
  initEdit?: boolean;
  disabled?: boolean;
}

const WinnerName: React.FC<WinnerNameProp> = ({ winner, handleChangeName, initEdit = false, disabled = false }) => {
  const [winnerName, setWinnerName] = useState(winner.name);
  const [isEdit, setIsEdit] = useState(initEdit);
  const changeWinnerName = () => {
    if (!winnerName) {
      setWinnerName(winner.name);
    } else {
      handleChangeName(winnerName);
    }
    setIsEdit(false);
  };
  useEffect(() => {
    setWinnerName(winner.name);
  }, [winner]);

  return (
    <div
      className={`body-s h-[32px] w-[240px] flex-shrink-0 rounded-[4px] border-[2px] text-neutral-off-black ${disabled ? 'bg-yellow-extra-light' : 'border-neutral-light-gray'}`}
    >
      {(!isEdit || disabled) && (
        <div
          className={` relative flex h-full w-full  items-center justify-center px-[26px]  ${!disabled && 'group cursor-pointer hover:bg-neutral-off-white'}`}
          onClick={() => {
            if (disabled) return;
            setIsEdit(!isEdit);
          }}
        >
          {winnerName}
          <CiEdit size={18} className="absolute right-[8px]  hidden group-hover:block" />
        </div>
      )}
      {isEdit && !disabled && (
        <input
          type="text"
          className="flex h-full w-full border-none text-center outline-status-success"
          placeholder="e.g. First Prize, Best Teamwork..."
          value={winnerName}
          onChange={(e) => {
            const value = e.target.value;
            setWinnerName(value);
          }}
          onBlur={changeWinnerName}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              changeWinnerName();
            }
          }}
        />
      )}
    </div>
  );
};

export default WinnerName;
