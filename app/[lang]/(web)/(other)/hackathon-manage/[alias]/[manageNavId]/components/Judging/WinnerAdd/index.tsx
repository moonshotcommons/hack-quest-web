import React, { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { v4 } from 'uuid';
import WinnerCard from './WinnerCard';
import { ConfirmModal } from '@/components/hackathon-org/modals/confirm-modal';

interface WinnerAddProp {
  winners: any;
  setWinners: (winners: any) => void;
}

const WinnerAdd: React.FC<WinnerAddProp> = ({ winners, setWinners }) => {
  const [removeWinner, setRemoveWinner] = useState<any>(null);
  const handleAddWinner = () => {
    const newWinner = {
      id: v4(),
      prizeName: ''
    };
    setWinners([...winners, newWinner]);
  };
  const handleChangeWinner = (index: number, winner: any) => {
    const newWinners = structuredClone(winners);
    newWinners[index] = winner;
    setWinners(newWinners);
  };
  const confirmRemoveWinner = () => {
    const newWinners = winners.filter((v: any) => v.id !== removeWinner.id);
    setWinners(newWinners);
    setRemoveWinner(null);
  };
  return (
    <div>
      <div className="flex flex-col gap-[16px]">
        {winners.map((v: any, i: number) => (
          <WinnerCard
            winner={v}
            key={v.id}
            handleChangeWinner={(winner) => handleChangeWinner(i, winner)}
            handleRemoveWinner={() => {
              setRemoveWinner(v);
            }}
          />
        ))}
        <div
          className="flex cursor-pointer items-center justify-center gap-[8px] rounded-[16px] border border-dotted border-neutral-medium-gray py-[24px] text-neutral-medium-gray"
          onClick={handleAddWinner}
        >
          <IoIosAddCircle size={26} />
          <span>Add a winner</span>
        </div>
      </div>
      <ConfirmModal
        open={!!removeWinner?.id}
        autoClose={false}
        onClose={() => setRemoveWinner(null)}
        onConfirm={confirmRemoveWinner}
      >
        {`Do you want to remove this winner ${removeWinner?.name}?`}
      </ConfirmModal>
    </div>
  );
};

export default WinnerAdd;
