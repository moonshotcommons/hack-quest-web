import React from 'react';
import WinnerProject from '../../WinnerProject';
import WinnerName from '../../WinnerName';
import { HackathonWinnerType } from '@/service/webApi/resourceStation/type';

interface WinnerCardProp {
  handleChangeName: (prizeName: string) => void;
  winner: HackathonWinnerType;
  disabled?: boolean;
}

const WinnerCard: React.FC<WinnerCardProp> = ({ winner, handleChangeName, disabled }) => {
  return (
    <div className="flex items-center gap-[20px] rounded-[10px] border border-neutral-light-gray px-[24px] py-[20px] text-neutral-off-black">
      <WinnerName winner={winner} disabled={disabled} handleChangeName={handleChangeName} />
      <WinnerProject project={winner.project} isLink={true} />
    </div>
  );
};

export default WinnerCard;
